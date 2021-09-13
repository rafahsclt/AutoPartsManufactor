import {getMongoManager, MongoEntityManager} from "typeorm";
import { hash } from 'bcryptjs'

import { Company } from "../../schemas/Company";
import { Unit } from "../../schemas/Unit";
import { User } from "../../schemas/User";
import { Machine } from "../../schemas/Machine";

export async function databaseSeed() {
  const manager = getMongoManager();
  
  await companiesSeed(manager)
  await unitsSeed(manager)
  await usersSeed(manager)
  await machinesSeed(manager)
}

async function companiesSeed(manager: MongoEntityManager) {
  const companies = await manager.find(Company)

  if(companies.length === 0) {
    const company_one = new Company();
    const company_two = new Company();
    const company_three = new Company();
    
    company_one.name = "Supreme Brakes"
    company_two.name = "Serraf"
    company_three.name = "Sales Imports"
  
  
    await manager.save(company_one);
    await manager.save(company_two);
    await manager.save(company_three);
  }
}

async function unitsSeed(manager: MongoEntityManager) {
  const units = await manager.find(Unit)

  if(units.length === 0) {
    const company = await manager.findOne(Company, { name: 'Supreme Brakes'})

    const unit_one = new Unit();
    const unit_two = new Unit();
    
    unit_one.local = "Sao Paulo"
    unit_one.company = company

    unit_two.local = "Rio de Janeiro"
    unit_two.company = company
  
  
    await manager.save(unit_one);
    await manager.save(unit_two);
  }
}

async function usersSeed(manager: MongoEntityManager) {
  const users = await manager.find(User)

  if(users.length === 0) {
    const company = await manager.findOne(Company, { name: 'Supreme Brakes'})

    const hashedPassword = await hash("123456", 8)

    const user_one = new User();
    const user_two = new User();
    
    user_one.name = "Emerson Rodrigues"
    user_one.email = "emerson@mail.com"
    user_one.password = hashedPassword
    user_one.isAdmin = true
    user_one.company = company

    user_two.name = "Roberta Silva"
    user_two.email = "roberta@mail.com"
    user_two.password = hashedPassword
    user_two.isAdmin = true
    user_two.company = company
  
    await manager.save(user_one);
    await manager.save(user_two);
  }
}

async function machinesSeed(manager: MongoEntityManager) {
  const machines = await manager.find(Machine)

  if(machines.length === 0) {
    const unit_one = await manager.findOne(Unit, { local: 'Sao Paulo'})
    
    const machine_one =  new Machine()
    const machine_two =  new Machine()
    const machine_three =  new Machine()
    const machine_four =  new Machine()
    const machine_five =  new Machine()

    machine_one.name = 'Milling'
    machine_one.model = 'PCX-50'
    machine_one.description = ''
    machine_one.health_level = 82
    machine_one.owner = 'Supreme Brake'
    machine_one.status = 'Running'
    machine_one.unit = unit_one
    machine_one.image = 'milling.jpg'
    machine_one.image_url = 'http://localhost:3333/files/milling.jpg'

    machine_two.name = 'Drilling'
    machine_two.model = 'CP-42'
    machine_two.description = ''
    machine_two.health_level = 72
    machine_two.owner = 'Supreme Brake'
    machine_two.status = 'Running'
    machine_two.unit = unit_one
    machine_two.image = 'drilling.jpg'
    machine_two.image_url = 'http://localhost:3333/files/drilling.jpg'

    machine_three.name = 'Lathe'
    machine_three.model = 'CNC P4'
    machine_three.description = ''
    machine_three.health_level = 8
    machine_three.owner = 'Supreme Brake'
    machine_three.status = 'Stopped'
    machine_three.unit = unit_one
    machine_three.image = 'lathe.jpg'
    machine_three.image_url = 'http://localhost:3333/files/lathe.jpg'

    machine_four.name = 'Robot'
    machine_four.model = 'M-4000'
    machine_four.description = ''
    machine_four.health_level = 42
    machine_four.owner = 'Supreme Brake'
    machine_four.status = 'Alerting'
    machine_four.unit = unit_one
    machine_four.image = 'robot.jpg'
    machine_four.image_url = 'http://localhost:3333/files/robot.jpg'

    machine_five.name = 'Elevator'
    machine_five.model = 'CX40'
    machine_five.description = ''
    machine_five.health_level = 60
    machine_five.owner = 'Supreme Brake'
    machine_five.status = 'Running'
    machine_five.unit = unit_one
    machine_five.image = 'elevator.jpg'
    machine_five.image_url = 'http://localhost:3333/files/elevator.jpg'

    await manager.save(machine_one)
    await manager.save(machine_two)
    await manager.save(machine_three)
    await manager.save(machine_four)
    await manager.save(machine_five)

    const unit_two = await manager.findOne(Unit, { local: 'Sao Paulo'})
    const machine_six =  new Machine()
    const machine_seven =  new Machine()
    const machine_eight =  new Machine()
    const machine_nine =  new Machine()
    const machine_ten =  new Machine()

    machine_six.name = 'Milling'
    machine_six.model = 'PCX-30'
    machine_six.description = ''
    machine_six.health_level = 55
    machine_six.owner = 'Supreme Brake'
    machine_six.status = 'Running'
    machine_six.unit = unit_two
    machine_six.image = 'milling.jpg'
    machine_six.image_url = 'http://localhost:3333/files/milling.jpg'

    machine_seven.name = 'Drilling'
    machine_seven.model = 'CP-46'
    machine_seven.description = ''
    machine_seven.health_level = 32
    machine_seven.owner = 'Supreme Brake'
    machine_seven.status = 'Alerting'
    machine_seven.unit = unit_two
    machine_seven.image = 'drilling.jpg'
    machine_seven.image_url = 'http://localhost:3333/files/drilling.jpg'

    machine_eight.name = 'Lathe'
    machine_eight.model = 'CNC P9'
    machine_eight.description = ''
    machine_eight.health_level = 8
    machine_eight.owner = 'Supreme Brake'
    machine_eight.status = 'Stopped'
    machine_eight.unit = unit_two
    machine_eight.image = 'lathe.jpg'
    machine_eight.image_url = 'http://localhost:3333/files/lathe.jpg'

    machine_nine.name = 'Robot'
    machine_nine.model = 'M-6000'
    machine_nine.description = ''
    machine_nine.health_level = 98
    machine_nine.owner = 'Supreme Brake'
    machine_nine.status = 'Running'
    machine_nine.unit = unit_two
    machine_nine.image = 'robot.jpg'
    machine_nine.image_url = 'http://localhost:3333/files/robot.jpg'

    machine_ten.name = 'Elevator'
    machine_ten.model = 'CX40'
    machine_ten.description = ''
    machine_ten.health_level = 65
    machine_ten.owner = 'Supreme Brake'
    machine_ten.status = 'Running'
    machine_ten.unit = unit_two
    machine_ten.image = 'elevator.jpg'
    machine_ten.image_url = 'http://localhost:3333/files/elevator.jpg'

    await manager.save(machine_ten)
    await manager.save(machine_nine)
    await manager.save(machine_eight)
    await manager.save(machine_seven)
    await manager.save(machine_six)
  }
}