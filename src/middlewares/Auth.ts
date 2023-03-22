import { Request, Response, NextFunction } from "express";
import { decode }                          from "jsonwebtoken";
import { ApiError }                        from "../errors/ApiError";
import { DecodeRealtor }                   from "../types/DecodeRealtor";

export class Auth{

  realtorAuth(req:Request, res:Response, next:NextFunction){

    const { headers: { authorization }} = req

    if(!authorization){

      throw new ApiError(401, 'unauthorized')

    }

    const token = authorization.split(' ')[1]

    const user = decode(token) as DecodeRealtor

    req.body.user = user

    next()

  }

}