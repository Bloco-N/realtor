import { router } from './router'
import cors       from 'cors'
import express    from 'express'
const cookieSession = require("cookie-session")
const passport = require("passport")

const passportSetup = require("./passport")

export class App {

  public server: express.Application
  private port: number

  constructor(port: number) {

    this.port = port

    this.server = express()
    this.middleware()
    this.router()
  
  }

  private middleware() {

    this.server.use(cors({
      origin: 'http://localhost:3000',
      methods: 'GET,POST,PUT,DELETE',
      credentials: true
    }))
    this.server.use(express.json({ limit: 10000000 }))
  
  }

  private router() {
    this.server.use(cookieSession({
      name:'session',
      keys: 'meoagent',
      maxAge: 24 * 60 * 60 * 100
    }))

    this.server.use(passport.initialize())
    this.server.use(passport.session())


    this.server.use(router)
  
  }

  public listen() {

    this.server.listen(this.port, () => {

      console.log('server runing in http://localhost:' + this.port)
    
    })
  
  }

}
