import { App }     from './app'
import * as dotenv from 'dotenv'

dotenv.config()

const app = new App(Number(process.env.PORT))

app.listen()
