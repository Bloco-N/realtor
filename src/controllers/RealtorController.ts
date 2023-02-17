import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { ListAllRealtorsQuery } from '../dtos/requests/ListAllRealtorsQuery'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { RealtorRepository }    from '../repositories/RealtorRepository'
import { Request, Response }    from 'express'

export class RealtorController {

  private repository = new RealtorRepository()

  public async listAll(req: Request<unknown, unknown, unknown, ListAllRealtorsQuery>, res: Response) {
    
    const {
      query: { search, page, offset }
    } = req
    const realtors = await this.repository.findAll(search, page, offset)
    res.status(200).send(realtors)
  
  }

  public async add(req: Request<unknown, unknown, CreateRealtorRequest>, res: Response) {

    const { body } = req
    const created = await this.repository.add(body)
    res.status(200).send(created)
  
  }

  public async update(req: Request<unknown, unknown, UpdateRealtorRequest>, res: Response) {

    const { body } = req
    const updated = await this.repository.update(body)
    res.status(200).send(updated)
  
  }

}
