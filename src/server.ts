import { App }     from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const app = new App(8080)

app.listen()