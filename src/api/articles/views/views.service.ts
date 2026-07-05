import { asyncHandler } from 'async-handler-ts'
import { client as redisClient } from 'app/cache'
import { ArticleModel } from '../model/Article.Model'

const REDIS_VIEW_PREFIX = 'article:views:'
const REDIS_VIEWER_PREFIX = 'article:viewers:'
const VIEWER_TTL_SECONDS = 86400 // 24 hours — one unique view per IP per day
const BATCH_FLUSH_INTERVAL_MS = 60_000 // flush accumulated views every 60s

// We track pending view increments in a local buffer so the article document
// is only written to every N seconds rather than on every HTTP request.
const pendingIncrements = new Map<string, number>()

let flushTimer: ReturnType<typeof setInterval> | null = null

/**
 * Initialise the background flush timer.  Should be called once during boot.
 * Ensures the shared Redis client is connected before starting the flusher.
 */
export const initViewFlusher = async () => {
  if (flushTimer) return

  // Ensure the Redis client is connected
  if (!redisClient.isOpen) {
    const [, err] = await asyncHandler(redisClient.connect())
    if (err) {
      console.error('Failed to connect Redis client for view tracking:', err.message)
      return
    }
  }

  flushTimer = setInterval(async () => {
    if (pendingIncrements.size === 0) return

    // Snapshot & reset the pending map
    const snapshot = new Map(pendingIncrements)
    pendingIncrements.clear()

    const bulkOps: Array<{
      updateOne: { filter: { slug: string }; update: { $inc: { views: number } } }
    }> = []

    for (const [slug, count] of snapshot) {
      bulkOps.push({
        updateOne: {
          filter: { slug },
          update: { $inc: { views: count } },
        },
      })
    }

    try {
      await ArticleModel.bulkWrite(bulkOps)
    } catch (err) {
      // If the flush fails, add the counts back so they aren't lost.
      for (const [slug, count] of snapshot) {
        pendingIncrements.set(slug, (pendingIncrements.get(slug) ?? 0) + count)
      }
      console.error('View flush failed, re-queued counts:', err)
    }
  }, BATCH_FLUSH_INTERVAL_MS)

  // Allow the process to exit even if the timer is still running
  if (flushTimer && typeof flushTimer === 'object' && 'unref' in flushTimer) {
    flushTimer.unref()
  }
}

/**
 * Register a view for the given article slug from a viewer identifier (IP / session).
 *
 * Returns `true` if the view was counted (first time from this viewer within the TTL window),
 * `false` if it was a duplicate.
 */
export const registerView = async (
  slug: string,
  viewerId: string,
): Promise<boolean> => {
  // 1. Deduplicate by viewer
  const viewerKey = `${REDIS_VIEWER_PREFIX}${slug}:${viewerId}`
  const alreadySeen = await redisClient.get(viewerKey)
  if (alreadySeen) return false

  await redisClient.setEx(viewerKey, VIEWER_TTL_SECONDS, '1')

  // 2. Increment the Redis counter (for near-real-time reads if needed)
  const countKey = `${REDIS_VIEW_PREFIX}${slug}`
  await redisClient.incr(countKey)

  // 3. Buffer the DB write
  pendingIncrements.set(slug, (pendingIncrements.get(slug) ?? 0) + 1)

  return true
}

/**
 * Get the current view count for an article (from Redis if available, otherwise fallback to DB).
 */
export const getViewCount = async (slug: string): Promise<number> => {
  const countKey = `${REDIS_VIEW_PREFIX}${slug}`
  const cached = await redisClient.get(countKey)
  if (cached !== null) return Number(cached)

  // Fallback to DB
  const article = await ArticleModel.findOne({ slug }, { views: 1 }).lean().exec()
  return article?.views ?? 0
}

/**
 * Compute a viewer identifier from the request.
 * Uses the IP address; can be extended with a session/user id.
 */
export const getViewerId = (ip: string, userId?: string): string => {
  return userId ? `user:${userId}` : `ip:${ip}`
}