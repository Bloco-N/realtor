import { ApiError } from '../errors/ApiError'
import { Schema }   from 'express-validator'

export default {
  search: {
    isString: {
      errorMessage: { message: 'Not valid value', status: 400 } as ApiError
    }
  },
  page: {
    isInt: {
      options: { gt: 0 },
      errorMessage: { message: 'Page number needs to be greater than 0', status: 400 } as ApiError
    }
  },
  offset: {
    isInt: {
      options: [{ gt: 1 }, { lt: 100 }],
      errorMessage: { message: 'The offset value must be between 1 and 100', status: 400 } as ApiError
    }
  }
} as Schema
