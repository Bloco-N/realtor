import { CreateAwardRequest }       from '../dtos/requests/CreateAwardRequest'
import { CreateCourseRequest }      from '../dtos/requests/CreateCourseRequest'
import { CreatePartnershipRequest } from '../dtos/requests/CreatePartnershipRequest'
import { CreatePropertyRequest }    from '../dtos/requests/CreatePropertyRequest'
import { CreateRealtorRequest }     from '../dtos/requests/CreateRealtorRequest'
import { ListAllRealtorsQuery }     from '../dtos/requests/ListAllRealtorsQuery'
import { UpdateRealtorRequest }     from '../dtos/requests/UpdateRealtorRequest'
import { ApiError }                 from '../errors/ApiError'
import errorHandling                from '../handlers/errorHandling'
import { RealtorRepository }        from '../repositories/RealtorRepository'
import { Request, Response }        from 'express'
import { validationResult }         from 'express-validator'
import { GeoApiService }            from '../services/GeoApiService'

export class RealtorController {

  private repository = new RealtorRepository()

  private geoApiService = new GeoApiService()

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
  
  public async signInGoogle(req: Request, res: Response) {

    try {

      const { body } = req

      const token = await this.repository.signInGoogle(body)

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

      const { realtorId } = req.params
      const properties = await this.repository.findAllProperties(Number(realtorId))

      res.status(200).send(properties)
    
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

  public async updateProperty(req: Request, res: Response) {

    try {

      const { propertyId } = req.params

      const { body } = req

      const updated = await this.repository.updateProperty(parseInt(propertyId), body)

      res.status(200).send(updated)
    
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

  public async listAllAwards(req: Request, res: Response) {

    try {

      const { realtorId } = req.params
      const awards = await this.repository.findAllAwards(Number(realtorId))

      res.status(200).send(awards)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addAward(req: Request<unknown, unknown, CreateAwardRequest>, res: Response) {

    try {

      const { body } = req

      const created = await this.repository.addAward(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removeAward(req: Request, res: Response) {

    try {

      const { awardId } = req.params
      const {
        user: { id }
      } = req.body
      const realtor = await this.repository.deleteAward(Number(id), Number(awardId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllCourses(req: Request, res: Response) {

    try {

      const { realtorId } = req.params
      const courses = await this.repository.findAllCourses(Number(realtorId))

      res.status(200).send(courses)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addCourse(req: Request<unknown, unknown, CreateCourseRequest>, res: Response) {

    try {

      const { body } = req

      const created = await this.repository.addCourse(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removeCourse(req: Request, res: Response) {

    try {

      const { courseId } = req.params
      const {
        user: { id }
      } = req.body
      const realtor = await this.repository.deleteCourse(Number(id), Number(courseId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllPartnership(req: Request, res: Response) {

    try {

      const { realtorId } = req.params
      const partnerships = await this.repository.findAllPartnerships(Number(realtorId))

      res.status(200).send(partnerships)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async addPartnership(req: Request<unknown, unknown, CreatePartnershipRequest>, res: Response) {

    try {

      const { body } = req

      const created = await this.repository.addPartnership(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removePartnerShip(req: Request, res: Response) {

    try {

      const { partnershipId } = req.params
      const {
        user: { id }
      } = req.body
      const realtor = await this.repository.deletePartnership(Number(id), Number(partnershipId))

      res.status(200).send(realtor)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async listAllComments(req: Request, res: Response) {

    try {

      const { realtorId } = req.params
      const comments = await this.repository.findAllComments(Number(realtorId))

      res.status(200).send(comments)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async updateComment(req:Request, res:Response){

    try {

      const { commentId } = req.params

      const { body } = req
      
      const updated = await this.repository.updateComment(Number(commentId), body)

      res.status(200).send(updated)
      
    } catch (error) {

      errorHandling(res, error)
    
    }

  }

  public async listAllCities(req: Request, res:Response){

    try {

      const cities = await this.geoApiService.listAllCities()

      res.status(200).send(cities)
      
    } catch (error) {

      errorHandling(res, error)
    
    }

  }

  public async listAllCitiesRealtor(req:Request, res:Response){

    try {
      
      const { realtorId } = req.params
  
      const cities = await this.repository.listAllCities(Number(realtorId))

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

  public async addLanguage(req:Request, res:Response){

    try {

      const body = req.body
      const updated = await this.repository.addLanguage(body.name,  Number(body.user.id))

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
