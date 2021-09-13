import { createConnection } from 'typeorm'
import { databaseSeed } from './seeds/databaseSeed'

async function connectAndSeed() {
  await createConnection()

  await databaseSeed()
}

connectAndSeed()