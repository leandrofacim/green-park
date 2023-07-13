import { ObjectLiteral, ObjectType, Repository } from 'typeorm'
import { PgConnection } from '@/infra/repositories/postgres/helpers/connection'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
