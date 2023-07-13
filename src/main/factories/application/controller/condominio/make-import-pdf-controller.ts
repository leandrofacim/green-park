import { ImportPDFController } from '@/application/controllers/condominio/import-pdf-controller'
import { Controller } from '@/application/controllers/controller'

export const makeImportPDFController = (): Controller => {
  return new ImportPDFController()
}
