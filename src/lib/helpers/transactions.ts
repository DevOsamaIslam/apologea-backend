import mongoose from 'mongoose'

/**
 * Runs a given function inside a MongoDB transaction and handles commit/rollback.
 * @param transactionFn - The async function containing the database operations.
 * @returns The result of the transaction function or throws an error if it fails.
 */
export const runTransaction = async <T>(transactionFn: (session: mongoose.ClientSession) => Promise<T>): Promise<T> => {
  const session = await mongoose.startSession() // Start a session

  try {
    session.startTransaction() // Start transaction

    const result = await transactionFn(session) // Run the provided function

    await session.commitTransaction() // Commit if successful
    return result
  } catch (error) {
    await session.abortTransaction() // Rollback on error
    console.error('Transaction failed, rolled back:', error)
    throw error // Re-throw for further handling
  } finally {
    session.endSession() // End session
  }
}
