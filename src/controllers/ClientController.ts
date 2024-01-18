import { CreateClientRequest } from '../dtos/requests/CreateClientRequest'
import { ListAllClientsQuery } from '../dtos/requests/ListAllClientsQuery'
import { UpdateClientRequest } from '../dtos/requests/UpdateClientRequest'
import { ApiError }            from '../errors/ApiError'
import errorHandling           from '../handlers/errorHandling'
import { ClientRepository }    from '../repositories/ClientRepository'
import { Request, Response }   from 'express'
import { validationResult }    from 'express-validator'

export class ClientController {

  private repository = new ClientRepository()

  public async listAll(req: Request<unknown, unknown, unknown, ListAllClientsQuery>, res: Response) {

    try {

      const errors = validationResult(req).array()

      if (errors.length > 0) {

        const error = errors[0].msg as ApiError
        throw new ApiError(error.status, error.message)
      
      }

      const {
        query: { search, page, offset }
      } = req

      const clients = await this.repository.findAll(search ? String(search) : '', page ? Number(page) : 1, offset ? Number(offset) : 10)

      res.status(200).send(clients)
    
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
      const client = await this.repository.get(Number(id))

      res.status(200).send(client)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async add(req: Request<unknown, unknown, CreateClientRequest>, res: Response) {

    try {

      const { body } = req
      const created = await this.repository.create(body)
      res.status(201).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async update(req: Request<unknown, unknown, UpdateClientRequest>, res: Response) {

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

  public async addComment(req: Request, res:Response){

    try {

      const { body } = req
      const created = await this.repository.addComment(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removeComment(req: Request, res:Response){

    try {

      const { commentId } = req.params
      const {
        user: { id }
      } = req.body
      const deleted = await this.repository.deleteComment(Number(id), Number(commentId))

      res.status(200).send(deleted)
    
    } catch (error) {

      errorHandling(res, error)
    
    }

  }

  public async addCommentAgency(req: Request, res:Response){

    try {

      const { body } = req

      const created = await this.repository.addCommentAgency(body)

      res.status(200).send(created)
    
    } catch (error) {

      errorHandling(res, error)
    
    }
  
  }

  public async removeCommentAgency(req: Request, res:Response){

    try {

      const { commentId } = req.params
      const {
        user: { id }
      } = req.body
      const deleted = await this.repository.deleteCommentAgency(Number(id), Number(commentId))

      res.status(200).send(deleted)
    
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

   public async reportAnunce(req:Request, res:Response){

    try {

      const { body:{ anuncio, descricao, name,idAnuncio,title,profile } } = req;
      const updated = await this.repository.reportAnunce(anuncio, descricao, name,idAnuncio,title,profile);
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

}
