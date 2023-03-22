import { Request, Response }     from "express";
import { CreatePropertyRequest } from "../dtos/requests/CreatePropertyRequest";
import { PropertyRepository }    from "../repositories/PropertyRepository";
import { DecodeRealtor }         from "../types/DecodeRealtor";

export class PropertyController{

  private repository = new PropertyRepository()

  public async listAllByRealtorId(req: Request, res: Response){

    const { params: { realtorId } } = req

    const properties = await this.repository.findAllFromRealtorId(Number(realtorId))

    res.status(200).send(properties)

  }

  public async add(req: Request, res: Response){
    
    const body = req.body as CreatePropertyRequest

    const created = await this.repository.add(body)

    res.status(200).send(created)

  }

  public async remove(req: Request, res: Response){
    
    const { body, params: { id } } = req

    const user = body.user as DecodeRealtor

    const deleted = await this.repository.remove(user, Number(id))

    res.status(200).send(deleted)

  }

}