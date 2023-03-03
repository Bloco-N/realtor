import { RealtorController }   from './controllers/RealtorController'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'
import { Auth }                from './middlewares/Auth'

const router = Router()
const realtorController = new RealtorController()
const auth = new Auth()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

export { router }
