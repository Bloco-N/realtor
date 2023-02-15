import { Request, Response, Router } from "express";
import { RealtorRepository } from "../repositories/RealtorRepository";

export class RealtorController {

  private repository = new RealtorRepository

  public async listAll(req: Request, res: Response) {
    const realtors = await this.repository.findAll()
    res.status(200).send(realtors)
  }
}