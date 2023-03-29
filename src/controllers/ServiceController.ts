import { Request, Response }    from "express";
import { CreateServiceRequest } from "../dtos/requests/CreateServiceRequest";
import { ServiceRepository }    from "../repositories/ServiceRepository";
import { DecodeRealtor }        from "../types/DecodeRealtor";

export class ServiceController{

  repository = new ServiceRepository()

  public async listAllByRealtorId(req: Request, res: Response){

    const { params: { realtorId } } = req

    const services = await this.repository.findAllByRealtorId(Number(realtorId))

    res.status(200).send(services)

  }

  public async add(req:Request, res:Response){
    
    const body = req.body as CreateServiceRequest

    const created = await this.repository.add(body)

    res.status(201).send(created)

  }

  public async remove(req: Request, res: Response){
    
    const { body, params: { id } } = req

    const user = body.user as DecodeRealtor

    const deleted = await this.repository.remove(user, Number(id))

    res.status(200).send(deleted)

  }

}