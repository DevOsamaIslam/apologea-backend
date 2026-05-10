import usersWatcher from 'api/users/users.watcher'
import { OUTPOST_INTERVAL } from './settings'

const jobs: Function[] = [usersWatcher]

export default () => {
  setInterval(() => {
    jobs.forEach(job => {
      job()
    })
  }, OUTPOST_INTERVAL)
}
