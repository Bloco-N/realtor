import { ApiError } from '../errors/ApiError'
import { Response } from 'express'

const errorHandling = (res: Response, error: Error) => {

  if (error instanceof ApiError) {

    res.status(error.status).send(error.message)
  
  } else {

    res.status(500).send('internal errror')
  
  }

}

export default errorHandling
