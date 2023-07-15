import { Router } from 'express'
import { adaptExpressRoute } from '@/main/adapters/express-router'
import { adaptMulter } from '@/main/adapters/multer'
import { makeImportCSVController, makeImportPDFController } from '../factories/application/controller'
import { makeUploadPDFController } from '../factories/application/controller/make-upload-pdf-controller'
import { makeRetrieveBoletoController } from '../factories/application/controller/make-retrieve-boletos-controller'
import { makeRelatorioController } from '../factories/application/controller/make-relatorio-controller'

export default (router: Router): void => {
  router.post('/import', adaptMulter, adaptExpressRoute(makeImportCSVController()))
  router.post('/import-pdf', adaptMulter, adaptExpressRoute(makeImportPDFController()))
  router.post('/upload-pdf', adaptMulter, adaptExpressRoute(makeUploadPDFController()))
  router.get('/boletos', adaptExpressRoute(makeRetrieveBoletoController()))
  router.get('/boletos/report', adaptExpressRoute(makeRelatorioController()))
}
