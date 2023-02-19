import { RealtorController }   from './controllers/RealtorController'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'

const router = Router()
const realtorController = new RealtorController()
router.get('/', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
export { router }
