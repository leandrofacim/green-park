import 'reflect-metadata'
import './config/module-alias'
import 'dotenv/config'

import { env } from '@/main/config/env'
import { PgConnection } from '@/infra/repositories/postgres/helpers/connection'

PgConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(env.port, () => console.log(`server running at http://localhost:${env.port}`))
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
