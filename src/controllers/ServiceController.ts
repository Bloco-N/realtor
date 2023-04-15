import { Request, Response } from "express";
import { ServiceRepository } from "../repositories/ServiceRepository";

export class ServiceController {

  repository = new ServiceRepository()

  public async listAll(req:Request, res:Response){
    
    const services = await this.repository.findAll()
    res.status(200).json(services)

  }

  public async listAllByRealtor(req:Request, res:Response){

    const { params:{ realtorId } } = req

    const services = await this.repository.findAllByRealtor(Number(realtorId))

    res.status(200).json(services)

  }

  public async createRealtorService(req: Request, res:Response){

    const { body } = req

    const created = await this.repository.createRealtorService(body.realtorId, body.serviceId)

    res.status(200).send(created)

  }

  public async removeRealtorService(req:Request, res:Response){

    const { params:{ id } } = req

    const removed = await this.repository.removeRealtorService(Number(id))

    res.status(200).send(removed)

  }

}
