import { Router } from 'express'
import { RealtorController } from './controllers/RealtorController'

const router = Router()
const realtorController = new RealtorController()
router.get('/', realtorController.listAll.bind(realtorController))

export { router }