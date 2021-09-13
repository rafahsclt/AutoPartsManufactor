import { Request, Response } from 'express'

import { CreateUnitService } from '../services/CreateUnitService'
import { DeleteUnitService } from '../services/DeleteUnitService'
import { ShowUnitService } from '../services/ShowUnitService'
import { UpdateUnitService } from '../services/UpdateUnitService'
import { ListUnitsService } from '../services/ListUnitsService'

export class UnitController {
  public async read(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const showUnitService = new ShowUnitService()
  
      const unit = await showUnitService.execute({
        unit_id: id
      })
  
      return resp.status(200).json(unit)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async create(req: Request, resp: Response) {
    try {
      const { local, company_id } = req.body
  
      const createUnitService = new CreateUnitService()
  
      const unit = await createUnitService.execute({
        local,
        company_id
      })
  
      return resp.status(201).json(unit)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async list(req: Request, resp: Response) {
    try {
      const listUnitsService = new ListUnitsService()
  
      const units = await listUnitsService.execute()
  
      return resp.status(200).json(units)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async update(req: Request, resp: Response) {
    try {
      const { id } = req.params
      const { local, company_id } = req.body
  
      const updateUnitService = new UpdateUnitService()
  
      const unit = await updateUnitService.execute({
        unit_id: id,
        local,
        company_id
      })
  
      return resp.status(200).json(unit)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const deleteUnitService = new DeleteUnitService()
  
      await deleteUnitService.execute({
        unit_id: id
      })
  
      return resp.status(204)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }
}