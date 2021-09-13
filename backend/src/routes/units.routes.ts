import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UnitController } from '../controllers/UnitControllers'

const unitsRouter = Router()
const unitController = new UnitController()

unitsRouter.get('/', ensureAuthenticated, unitController.list)
unitsRouter.get('/:id', ensureAuthenticated, unitController.read)
unitsRouter.post('/', ensureAuthenticated, unitController.create)
unitsRouter.put('/:id', ensureAuthenticated, unitController.update)
unitsRouter.delete('/:id', ensureAuthenticated, unitController.delete)

export { unitsRouter }