import { Company } from '../../schemas/Company'

export interface ICreateCompanyDTO {
  name: string
}

export interface IUpdateCompanyDTO {
  company_id: string
  name?: string
}


export interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>
  list(): Promise<Company[]>
  update(data: IUpdateCompanyDTO): Promise<Company>
  delete(company_id: string): Promise<void> 
  show(company_id: string): Promise<Company>
}