import { Router } from 'express'
import { SessionController } from '../controllers/SessionControllers'
import { checkAuthentication } from '../middlewares/checkAuthentication'

const sessionsRouter = Router()
const sessionController = new SessionController()

sessionsRouter.post('/sessions', sessionController.handle)
sessionsRouter.get('/me', checkAuthentication, sessionController.self)

export { sessionsRouter }