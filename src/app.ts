import { router } from './router'
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

    this.server.use(express.json())
  
  }

  private router() {

    this.server.use(router)
    
  }

  public listen(){

    this.server.listen(this.port, () => {

      console.log('server runing in http://localhost:' + this.port)
    
    })
  
  }

}
