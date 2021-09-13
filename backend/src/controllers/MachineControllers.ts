import { Request, Response } from 'express'

import { CreateMachineService } from '../services/CreateMachineService'
import { DeleteMachineService } from '../services/DeleteMachineService'
import { ShowMachineService } from '../services/ShowMachineService'
import { UpdateMachineService } from '../services/UpdateMachineService'
import { ListMachinesService } from '../services/ListMachinesService'

export class MachineController {
  public async read(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const showMachineService = new ShowMachineService()
  
      const machine = await showMachineService.execute({
        machine_id: id
      })
  
      return resp.status(200).json(machine)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async create(req: Request, resp: Response) {
    try {
      const { name, description, model, owner, status, health_level, unit_id } = req.body

      const imgFile = req.file as Express.Multer.File
  
      const createMachineService = new CreateMachineService()
  
      const machine = await createMachineService.execute({
        name,
        description,
        image: imgFile,
        model,
        owner,
        status,
        health_level,
        unit_id
      })
  
      return resp.status(201).json(machine)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async list(req: Request, resp: Response) {
    try {
      const listMachinesService = new ListMachinesService()
  
      const machines = await listMachinesService.execute()
  
      return resp.status(200).json(machines)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async update(req: Request, resp: Response) {
    try {
      const { id } = req.params
      const { name, description, owner, model, health_level, unit_id, status } = req.body

      const imgFile = req.file as Express.Multer.File
  
      const updateMachineService = new UpdateMachineService()
  
      const machine = await updateMachineService.execute({
        machine_id: id,
        name,
        description,
        status,
        owner,
        model,
        image: imgFile,
        health_level,
        unit_id
      })
  
      return resp.status(200).json(machine)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const deleteMachineService = new DeleteMachineService()
  
      await deleteMachineService.execute({
        machine_id: id
      })
  
      return resp.status(204)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }
}