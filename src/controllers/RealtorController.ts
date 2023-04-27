import { CreatePropertyRequest } from '../dtos/requests/CreatePropertyRequest'
import { CreateRealtorRequest }  from '../dtos/requests/CreateRealtorRequest'
import { ListAllRealtorsQuery }  from '../dtos/requests/ListAllRealtorsQuery'
import { UpdateRealtorRequest }  from '../dtos/requests/UpdateRealtorRequest'
import { ApiError }              from '../errors/ApiError'
import errorHandling             from '../handlers/errorHandling'
import { RealtorRepository }     from '../repositories/RealtorRepository'
import { Request, Response }     from 'express'
import { validationResult }      from 'express-validator'

export class RealtorController {

  private repository = new RealtorRepository()

  public async listAll(req: Request<unknown, unknown, unknown, ListAllRealtorsQuery>, res: Response) {

    try {

      const errors = validationResult(req).array()

      if (errors.length > 0) {

        const error = errors[0].msg as ApiError
        throw new ApiError(error.status, error.message)
      
      }

      const {
        query: { search, page, offset }
      } = req

      const realtors = await this.repository.findAll(search ? String(search) : '', page ? Number(page) : 1, offset ? Number(offset) : 10)

      res.status(200).send(realtors)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async signIn(req: Request, res: Response) {

    try {

      const { body } = req

      const token = await this.repository.signIn(body)

      res.status(200).send(token)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async get(req: Request, res: Response) {

    try {

      const { id } = req.params
      const realtor = await this.repository.get(Number(id))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async add(req: Request<unknown, unknown, CreateRealtorRequest>, res: Response) {

    try {

      const { body } = req
      const created = await this.repository.create(body)
      res.status(201).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async update(req: Request<unknown, unknown, UpdateRealtorRequest>, res: Response) {

    try {

      const { body } = req
      const updated = await this.repository.update(body)
      res.status(200).send(updated)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async remove(req: Request, res: Response) {

    try {

      const { id } = req.params
      const realtor = await this.repository.delete(Number(id))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllProperties(req: Request, res: Response) {

    try {

      const { realtorId } = req.params
      const realtor = await this.repository.findAllProperties(Number(realtorId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addProperty(req: Request<unknown, unknown, CreatePropertyRequest>, res: Response) {

    try {

      const { body } = req

      const created = await this.repository.addProperty(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removeProperty(req: Request, res: Response) {

    try {

      const { propertyId } = req.params
      const { user: { id } } = req.body
      const realtor = await this.repository.deleteProperty(Number(id), Number(propertyId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

}
