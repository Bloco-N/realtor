import { router } from './router'
import cors       from 'cors'
import express    from 'express'

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

    this.server.use(cors())
    this.server.use(express.json({ limit: 10000000 }))
  
  }

  private router() {

    this.server.use(router)
  
  }

  public listen() {

    this.server.listen(this.port, () => {

      console.log('server runing inn http://localhost:' + this.port)
    
    })
  
  }

}
