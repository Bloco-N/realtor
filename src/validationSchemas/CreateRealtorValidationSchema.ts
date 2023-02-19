import { ApiError } from '../errors/ApiError'
import { Schema }   from 'express-validator'

export default {
  email: {
    isEmail: {
      errorMessage: { message: 'Must be an email', status: 400 } as ApiError
    }
  },
  password: {
    isString: {
      errorMessage: { message: 'Invalid value', status: 400 } as ApiError
    },
    isStrongPassword: {
      errorMessage: {
        message: 'Your password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol',
        status: 400
      } as ApiError
    }
  },
  firstName: {
    isString: {
      errorMessage: { message: 'Invalid value', status: 400 } as ApiError
    }
  },
  lastName: {
    isString: {
      errorMessage: { message: 'Invalid value', status: 400 } as ApiError
    }
  }
} as Schema
