import { PgConnection } from '@/infra/repositories/postgres/helpers/connection'

export const makePgConnection = (): PgConnection => {
  return PgConnection.getInstance()
}
