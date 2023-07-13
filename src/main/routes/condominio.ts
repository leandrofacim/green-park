import { Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters/express-router'
import { adaptMulter } from '@/main/adapters/multer'
import { makeImportCSVController, makeImportPDFController } from '../factories/application/controller'
import { makeUploadPDFController } from '../factories/application/controller/condominio/make-upload-pdf-controller'

export default (router: Router): void => {
  router.post('/import', adaptMulter, adaptExpressRoute(makeImportCSVController()))
  router.post('/import-pdf', adaptMulter, adaptExpressRoute(makeImportPDFController()))
  router.post('/upload-pdf', adaptMulter, adaptExpressRoute(makeUploadPDFController()))
}
