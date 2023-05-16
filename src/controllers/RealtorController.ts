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

}
