import { CreateAgencyRequest }         from '../dtos/requests/CreateAgencyRequest'
import { CreatePropertyRequestAgency } from '../dtos/requests/CreatePropertyRequest'
import { ListAllAgencyQuery }          from '../dtos/requests/ListAllAgencyQuery'
import { UpdateAgencyRequest }         from '../dtos/requests/UpdateAgencyRequest'
import { ApiError }                    from '../errors/ApiError'
import errorHandling                   from '../handlers/errorHandling'
import { AgencyRepository }            from '../repositories/AgencyRepository'
import { Request, Response }           from 'express'
import { validationResult }            from 'express-validator'

export class AgencyController {

  private repository = new AgencyRepository()

  public async listAll(req: Request<unknown, unknown, unknown, ListAllAgencyQuery>, res: Response) {

    try {

      const errors = validationResult(req).array()

      if (errors.length > 0) {

        const error = errors[0].msg as ApiError
        throw new ApiError(error.status, error.message)
      
      }

      const {
        query: { search, page, offset }
      } = req

      const agency = await this.repository.findAll(search ? String(search) : '', page ? Number(page) : 1, offset ? Number(offset) : 10)

      res.status(200).send(agency)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllWithoutPagination (req: Request, res: Response){

    const agencies = await this.repository.findAllWithOutPagination()

    res.status(200).send(agencies)
  
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

      const agency = await this.repository.get(Number(id))

      res.status(200).send(agency)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async add(req: Request<unknown, unknown, CreateAgencyRequest>, res: Response) {

    try {

      const { body } = req
      const created = await this.repository.create(body)
      res.status(201).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async update(req: Request<unknown, unknown, UpdateAgencyRequest>, res: Response) {

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
      const agency = await this.repository.delete(Number(id))

      res.status(200).send(agency)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async recoverPassword(req:Request, res:Response){

    try {

      const { body:{ email } } = req
      const updated = await this.repository.recoverPassword(email)
      res.status(200).send(updated)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async updatePassword(req:Request, res:Response){

    try {

      const { body:{ password, user } } = req
      const updated = await this.repository.updatePassword(password, user)
      res.status(200).send(updated)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async updateVerify(req:Request, res:Response){

    try {

      const { body:{ user } } = req
      const updated = await this.repository.updateVerify(user)
      res.status(200).send(updated)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async verifyAccount(req:Request, res:Response){

    try {

      const { body:{ email } } = req
      const updated = await this.repository.verifyAccount(email)
      res.status(200).send(updated)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllProperties(req: Request, res: Response) {

    try {

      const { agencyId } = req.params
      const properties = await this.repository.findAllProperties(Number(agencyId))

      res.status(200).send(properties)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addProperty(req: Request<unknown, unknown, CreatePropertyRequestAgency>, res: Response) {

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
      const {
        user: { id }
      } = req.body
      const realtor = await this.repository.deleteProperty(Number(id), Number(propertyId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllCitiesRealtor(req:Request, res:Response){

    try {
      
      const { agencyId } = req.params
  
      const cities = await this.repository.listAllCities(Number(agencyId))

      res.status(200).send(cities)

    } catch (error) {

      errorHandling(res, error)
      
    }

  }

  public async addCity(req:Request, res:Response){

    try {

      const body = req.body

      const updated = await this.repository.addCity(body.name, Number(body.user.id))

      res.status(200).send(updated)
      
    } catch (error) {

      errorHandling(res, error)
      
    }

  }

  public async removeCity(req: Request, res: Response) {

    try {

      const { cityId } = req.params
      const {
        user: { id }
      } = req.body
      const removed = await this.repository.deleteCity(Number(id), Number(cityId))

      res.status(200).send(removed)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllComments(req: Request, res: Response) {

    try {

      const { agencyId } = req.params
      const comments = await this.repository.findAllComments(Number(agencyId))

      res.status(200).send(comments)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addLanguage(req:Request, res:Response){

    try {

      const body = req.body

      const updated = await this.repository.addLanguage(body.name, Number(body.user.id))

      res.status(200).send(updated)
      
    } catch (error) {

      errorHandling(res, error)
      
    }
  
  }

  public async removeLanguage(req: Request, res: Response) {

    try {

      const { languageId } = req.params
      const {
        user: { id }
      } = req.body
      const removed = await this.repository.deleteLanguage(Number(id), Number(languageId))

      res.status(200).send(removed)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

}
