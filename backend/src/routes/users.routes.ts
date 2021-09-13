import { Router } from 'express'
import multer from 'multer'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UserController } from '../controllers/UserControllers'
import uploadConfig from '../config/upload'

const usersRouter = Router()
const userController = new UserController()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar')) 

usersRouter.get('/', ensureAuthenticated, userController.list)
usersRouter.get('/:id', ensureAuthenticated, userController.read)
usersRouter.post('/', ensureAuthenticated, userController.create)
usersRouter.put('/:id', ensureAuthenticated, userController.update)
usersRouter.delete('/:id', ensureAuthenticated, userController.delete)
usersRouter.patch('/:id', ensureAuthenticated, uploadAvatar.single('avatar'), userController.updateAvatar)

export { usersRouter }