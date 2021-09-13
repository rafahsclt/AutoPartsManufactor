import { Router } from "express";

import { usersRouter } from "./users.routes"
import { companiesRouter } from "./companies.routes"
import { unitsRouter } from "./units.routes"
import { machinesRouter } from "./machines.routes"
import { sessionsRouter } from "./sessions.routes"

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/companies', companiesRouter)
routes.use('/units', unitsRouter)
routes.use('/machines', machinesRouter)
routes.use(sessionsRouter)

export { routes }