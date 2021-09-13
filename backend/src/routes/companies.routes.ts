import { Router } from 'express'

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CompanyController } from '../controllers/CompanyControllers'

const companiesRouter = Router()
const companyController = new CompanyController()

companiesRouter.get('/', ensureAuthenticated, companyController.list)
companiesRouter.get('/:id', ensureAuthenticated, companyController.read)
companiesRouter.post('/', ensureAuthenticated, companyController.create)
companiesRouter.put('/:id', ensureAuthenticated, companyController.update)
companiesRouter.delete('/:id', ensureAuthenticated, companyController.delete)

export { companiesRouter }