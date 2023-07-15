import { Controller } from '@/application/controllers/controller'
import { ImportCSVController } from '@/application/controllers/import-csv-controller'
import ImportCsv from '@/domain/use-cases/import-csv'
import { BoletoRepository } from '@/infra/repositories/postgres/boleto'
import { LoteRepository } from '@/infra/repositories/postgres/lote'
import { makePgTransactionController } from '../decorators/db-transaction-controller'

export const makeImportCSVController = (): Controller => {
  const loteRepository = new LoteRepository()
  const boletoRepository = new BoletoRepository()
  const service = new ImportCsv(loteRepository, boletoRepository)
  return makePgTransactionController(new ImportCSVController(service))
}
