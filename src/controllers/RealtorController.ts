import { CreateRealtorRequest } from '../dtos/requests/CreateRealtorRequest'
import { ListAllRealtorsQuery } from '../dtos/requests/ListAllRealtorsQuery'
import { UpdateRealtorRequest } from '../dtos/requests/UpdateRealtorRequest'
import { ApiError }             from '../errors/ApiError'
import { RealtorRepository }    from '../repositories/RealtorRepository'
import { Request, Response }    from 'express'
import { validationResult }     from 'express-validator'

export class RealtorController {

  private repository = new RealtorRepository()

  public async listAll(req: Request<unknown, unknown, unknown, ListAllRealtorsQuery>, res: Response) {

    try {
      
      const errors = validationResult(req).array()
  
      if(errors.length > 0){

        const error = errors[0].msg as ApiError
        throw new ApiError(error.status, error.message)

      }
  
      const {
        query: { search, page, offset }
      } = req

      const realtors = await this.repository.findAll(search, Number(page), Number(offset))
      res.status(200).send(realtors)
    
    } catch (error) {

      if (error instanceof ApiError) {

        res.status(error.status).send(error.message)
      
      }else{

        res.status(500).send('internal errror')

      }
    
    }
  
  }

  public async get(req: Request, res: Response) {

    try {

      const { id } = req.params
      const realtor = await this.repository.get(Number(id))

      res.status(200).send(realtor)
    
    } catch (error) {

      if (error instanceof ApiError) {

        res.status(error.status).send(error.message)
      
      }else{

        res.status(500).send('internal errror')

      }
    
    }
  
  }

  public async add(req: Request<unknown, unknown, CreateRealtorRequest>, res: Response) {

    const { body } = req
    const created = await this.repository.add(body)
    res.status(201).send(created)
  
  }

  public async update(req: Request<unknown, unknown, UpdateRealtorRequest>, res: Response) {

    const { body } = req
    const updated = await this.repository.update(body)
    res.status(200).send(updated)
  
  }

  public async remove(req: Request, res:Response){

    try {

      const { id } = req.params
      const realtor = await this.repository.remove(Number(id))

      res.status(200).send(realtor)
    
    } catch (error) {

      if (error instanceof ApiError) {

        res.status(error.status).send(error.message)
      
      }else{

        res.status(500).send('internal errror')

      }
    
    }
  
  }

}
