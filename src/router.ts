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

router.get('/city', realtorController.listAllCities.bind(realtorController))
router.get('/city/:realtorId', realtorController.listAllCitiesRealtor.bind(realtorController))
router.post('/city', auth.realtorAuth, realtorController.addCity.bind(realtorController))
router.delete('/city/:cityId', auth.realtorAuth, realtorController.removeCity.bind(realtorController))

router.post('/realtor/recover-password', realtorController.recoverPassword.bind(realtorController))
router.put('/realtor/recover-password/update-password', auth.realtorAuth, realtorController.updatePassword.bind(realtorController))

router.post('/client/recover-password', clientController.recoverPassword.bind(clientController))
router.put('/client/recover-password/update-password', auth.realtorAuth, clientController.updatePassword.bind(clientController))

router.post('/agency/recover-password', agencyController.recoverPassword.bind(agencyController))
router.put('/agency/recover-password/update-password', auth.realtorAuth, agencyController.updatePassword.bind(agencyController))

router.post('/realtor/verify', realtorController.verifyAccount.bind(realtorController))
router.put('/realtor/verify', auth.realtorAuth, realtorController.updateVerify.bind(realtorController))

router.post('/client/verify', clientController.verifyAccount.bind(clientController))
router.put('/client/verify', auth.realtorAuth, clientController.updateVerify.bind(clientController))

router.post('/agency/verify', agencyController.verifyAccount.bind(agencyController))
router.put('/agency/verify', auth.realtorAuth, agencyController.updateVerify.bind(agencyController))

router.post('/language', auth.realtorAuth, realtorController.addLanguage.bind(realtorController))
router.delete('/language/:languageId', auth.realtorAuth, realtorController.removeLanguage.bind(realtorController))

router.get('/realtor', checkSchema(ListAllValidationSchema), realtorController.listAll.bind(realtorController))
router.get('/realtor/:id', realtorController.get.bind(realtorController))
router.post('/realtor/sign-in', realtorController.signIn.bind(realtorController))
router.post('/realtor/sign-up', realtorController.add.bind(realtorController))
router.put('/realtor', auth.realtorAuth, realtorController.update.bind(realtorController))
router.delete('/realtor/:id', realtorController.remove.bind(realtorController))

router.get('/agency', agencyController.listAll.bind(agencyController))
router.get('/agency/no-pagination', agencyController.listAllWithoutPagination.bind(agencyController))
router.get('/agency/:id', agencyController.get.bind(agencyController))
router.post('/agency/sign-in', agencyController.signIn.bind(agencyController))
router.post('/agency/sign-up', agencyController.add.bind(agencyController))
router.put('/agency', auth.realtorAuth, agencyController.update.bind(agencyController))
router.delete('/agency/:id', agencyController.remove.bind(agencyController))

router.get('/client', clientController.listAll.bind(clientController))
router.get('/client/:id', clientController.get.bind(clientController))
router.post('/client/sign-in', clientController.signIn.bind(clientController))
router.post('/client/sign-up', clientController.add.bind(clientController))
router.put('/client', auth.realtorAuth, clientController.update.bind(clientController))
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

router.get('/partnership/realtor/:realtorId', realtorController.listAllPartnership.bind(realtorController))
router.post('/partnership', realtorController.addPartnership.bind(realtorController))
router.delete('/partnership/:partnershipId', auth.realtorAuth, realtorController.removePartnerShip.bind(realtorController))

router.get('/comment/realtor/:realtorId', realtorController.listAllComments.bind(realtorController))
router.post('/comment', clientController.addComment.bind(clientController))
router.delete('/comment/:commentId', auth.realtorAuth, clientController.removeComment.bind(clientController))

router.get('/service', serviceController.listAll.bind(serviceController))

router.get('/service/realtor/:realtorId', serviceController.listAllByRealtor.bind(serviceController))
router.post('/service/realtor', serviceController.createRealtorService.bind(serviceController))
router.delete('/service/realtor/:id', auth.realtorAuth, serviceController.removeRealtorService.bind(serviceController))

router.get('/service/agenct/:agencyId', serviceController.listAllByAgency.bind(serviceController))
router.post('/service/agency', serviceController.createAgencyService.bind(serviceController))
router.delete('/service/agency/:id', auth.realtorAuth, serviceController.removeAgencyService.bind(serviceController))

export { router }
