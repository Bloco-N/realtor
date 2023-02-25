import {  Response } from "express"
import { ApiError }  from "../errors/ApiError"

const errorHandling = ( res:Response, error:Error) => {

  console.log('error middleware: ' + error.message)
  
  if (error instanceof ApiError) {
  
    res.status(error.status).send(error.message)
    
  }else{
  
    res.status(500).send('internal errror')
  
  }

}

export default errorHandling