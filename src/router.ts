import { AgencyController }    from './controllers/AgencyController'
import { ClientController }    from './controllers/ClientController'
import { RealtorController }   from './controllers/RealtorController'
import { ServiceController }   from './controllers/ServiceController'
import { Auth }                from './middlewares/Auth'
import ListAllValidationSchema from './validationSchemas/ListAllValidationSchema'
import { Router }              from 'express'
import { checkSchema }         from 'express-validator'

const router = Router()
const realtorController = new RealtorController()
const serviceController = new ServiceController()
const agencyController = new AgencyController()
const clientController = new ClientController()
const auth = new Auth()

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

router.get('/agency', agencyController.listAll.bind(agencyController))
router.get('/agency/:id', agencyController.get.bind(agencyController))
router.post('/agency/sign-in', agencyController.signIn.bind(agencyController))
router.post('/agency/sign-up', agencyController.add.bind(agencyController))
router.put('/agency', auth.realtorAuth, agencyController.update.bind(agencyController))
router.delete('/agency/:id', agencyController.remove.bind(agencyController))

router.get('/client', clientController.listAll.bind(clientController))
router.get('/client/:id', clientController.get.bind(clientController))
router.post('/client/sign-in', clientController.signIn.bind(clientController))
router.post('/client/sign-up', clientController.add.bind(clientController))
router.put('/client', clientController.update.bind(clientController))
router.delete('/client/:id', clientController.remove.bind(clientController))

router.get('/property/realtor/:realtorId', realtorController.listAllProperties.bind(realtorController))
router.post('/property', realtorController.addProperty.bind(realtorController))
router.delete('/property/:propertyId', auth.realtorAuth, realtorController.removeProperty.bind(realtorController))

router.get('/award/realtor/:realtorId', realtorController.listAllAwards.bind(realtorController))
router.post('/award', realtorController.addAward.bind(realtorController))
router.delete('/award/:awardId', auth.realtorAuth, realtorController.removeAward.bind(realtorController))

router.get('/course/realtor/:realtorId', realtorController.listAllCourses.bind(realtorController))
router.post('/course', realtorController.addCourse.bind(realtorController))
router.delete('/course/:courseId', auth.realtorAuth, realtorController.removeCourse.bind(realtorController))

router.get('/service', serviceController.listAll.bind(serviceController))
router.get('/service/realtor/:realtorId', serviceController.listAllByRealtor.bind(serviceController))
router.post('/service/realtor', serviceController.createRealtorService.bind(serviceController))
router.delete('/service/realtor/:id', auth.realtorAuth, serviceController.removeRealtorService.bind(serviceController))

export { router }
