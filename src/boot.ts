import { config as dotenv } from 'dotenv'
dotenv()
import 'module-alias/register'
// create server
import { server } from './server/init'

const app = server()
