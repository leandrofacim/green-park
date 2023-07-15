import { UploadPDFController } from '@/application/controllers/upload-pdf-controller'
import { Controller } from '@/application/controllers/controller'
import UploadPdf from '@/domain/use-cases/upload-pdf'
import { BoletoRepository } from '@/infra/repositories/postgres/boleto'

export const makeUploadPDFController = (): Controller => {
  const repository = new BoletoRepository()
  const service = new UploadPdf(repository)
  return new UploadPDFController(service)
}
