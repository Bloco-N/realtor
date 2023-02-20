import { RealtorController }   from './controllers/RealtorController'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'

const router = Router()
const realtorController = new RealtorController()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

export { router }
