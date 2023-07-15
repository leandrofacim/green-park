import { Controller } from '@/application/controllers/controller'
import { DbTransactionController } from '@/application/decorators/db-transaction-controller'
import { makePgConnection } from '../../infra/connection'

export const makePgTransactionController = (controller: Controller): DbTransactionController => {
  return new DbTransactionController(controller, makePgConnection())
}
