import { Router } from 'express'
import multer from 'multer'

import { MachineController } from '../controllers/MachineControllers'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

import uploadConfig from '../config/upload'

const uploadImage = multer(uploadConfig.upload()) 

const machinesRouter = Router()
const machineController = new MachineController()

machinesRouter.get('/', ensureAuthenticated, machineController.list)
machinesRouter.get('/:id', ensureAuthenticated, machineController.read)
machinesRouter.post('/', ensureAuthenticated, uploadImage.single('machineImage'), machineController.create)
machinesRouter.put('/:id', ensureAuthenticated, machineController.update)
machinesRouter.delete('/:id', ensureAuthenticated, machineController.delete)

export { machinesRouter }