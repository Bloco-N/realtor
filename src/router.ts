import { RealtorController }   from './controllers/RealtorController'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'
import { Auth }                from './middlewares/Auth'
import { PropertyController }  from './controllers/PropertyController'

const router = Router()
const realtorController = new RealtorController()
const porpertyController = new PropertyController()
const auth = new Auth()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

router.get('/property/:realtorId', porpertyController.listAllByRealtorId.bind(porpertyController))
router.post('/property', porpertyController.add.bind(porpertyController))
router.delete('/property/:id', auth.realtorAuth, porpertyController.remove.bind(porpertyController))

export { router }
