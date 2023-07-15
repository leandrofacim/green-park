import RetrieveBoletoController from '@/application/controllers/retrieve-boleto-controller'
import { Controller } from '@/application/controllers/controller'
import RetrieveBoleto from '@/domain/use-cases/retrieve-boleto'
import { BoletoRepository } from '@/infra/repositories/postgres/boleto'

export const makeRetrieveBoletoController = (): Controller => {
  const boletoRepository = new BoletoRepository()
  const service = new RetrieveBoleto(boletoRepository)
  return new RetrieveBoletoController(service)
}
