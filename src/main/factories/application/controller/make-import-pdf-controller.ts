import { ImportPDFController } from '@/application/controllers/import-pdf-controller'
import { Controller } from '@/application/controllers/controller'

export const makeImportPDFController = (): Controller => {
  return new ImportPDFController()
}
