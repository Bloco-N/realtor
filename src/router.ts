import { RealtorController }   from './controllers/RealtorController'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'
import { Auth }                from './middlewares/Auth'
import { PropertyController }  from './controllers/PropertyController'
import { ServiceController }   from './controllers/ServiceController'

const router = Router()
const realtorController = new RealtorController()
const propertyController = new PropertyController()
const serviceController = new ServiceController()
const auth = new Auth()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

router.get('/property/realtor/:realtorId', propertyController.listAllByRealtorId.bind(propertyController))
router.post('/property', propertyController.add.bind(propertyController))
router.delete('/property/:id', auth.realtorAuth, propertyController.remove.bind(propertyController))

router.get('/service/realtor/:realtorId', serviceController.listAllByRealtorId.bind(serviceController))
router.post('/service', serviceController.add.bind(serviceController))
router.delete('/service/:id', auth.realtorAuth, serviceController.remove.bind(serviceController))

export { router }
