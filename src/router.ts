import { RealtorController } from './controllers/RealtorController'
import { Router }            from 'express'

const router = Router()
const realtorController = new RealtorController()
router.get('/', realtorController.listAll.bind(realtorController))

export { router }
