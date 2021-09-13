import { Request, Response } from 'express'

import { CreateCompanyService } from '../services/CreateCompanyService'
import { DeleteCompanyService } from '../services/DeleteCompanyService'
import { ShowCompanyService } from '../services/ShowCompanyService'
import { UpdateCompanyService } from '../services/UpdateCompanyService'
import { ListCompaniesService } from '../services/ListCompaniesService'

export class CompanyController {
  public async read(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const showCompanyService = new ShowCompanyService()
  
      const company = await showCompanyService.execute({
        company_id: id
      })
  
      return resp.status(200).json(company)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async create(req: Request, resp: Response) {
    try {
      const { name } = req.body
  
      const createCompanyService = new CreateCompanyService()
  
      const company = await createCompanyService.execute({
        name
      })
  
      return resp.status(201).json(company)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async list(req: Request, resp: Response) {
    try {
      const listCompaniesService = new ListCompaniesService()
  
      const companies = await listCompaniesService.execute()
  
      return resp.status(200).json(companies)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async update(req: Request, resp: Response) {
    try {
      const { id } = req.params
      const { name } = req.body
  
      const updateCompanyService = new UpdateCompanyService()
  
      const company = await updateCompanyService.execute({
        company_id: id,
        name
      })
  
      return resp.status(200).json(company)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }

  public async delete(req: Request, resp: Response) {
    try {
      const { id } = req.params
  
      const deleteCompanyService = new DeleteCompanyService()
  
      await deleteCompanyService.execute({
        company_id: id
      })
  
      return resp.status(204)
    } catch(err: any) {
      return resp.status(400).json({ error: err.message })
    }
  }
}