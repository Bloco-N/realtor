import { RealtorController }   from './controllers/RealtorController'
import { ServiceController }   from './controllers/ServiceController'
import { Auth }                from './middlewares/Auth'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'

const router = Router()
const realtorController = new RealtorController()
const serviceController = new ServiceController()
const auth = new Auth()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

router.get('/property/realtor/:realtorId', realtorController.listAllProperties.bind(realtorController))
router.post('/property', realtorController.addProperty.bind(realtorController))
router.delete('/property/:propertyId', auth.realtorAuth, realtorController.removeProperty.bind(realtorController))

router.get('/service', serviceController.listAll.bind(serviceController))
router.get('/service/realtor/:realtorId', serviceController.listAllByRealtor.bind(serviceController))
router.post('/service/realtor', serviceController.createRealtorService.bind(serviceController))
router.delete('/service/realtor/:id', auth.realtorAuth, serviceController.removeRealtorService.bind(serviceController))

export { router }
