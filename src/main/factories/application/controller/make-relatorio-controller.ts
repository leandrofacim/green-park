import { Controller } from '@/application/controllers/controller'
import { RelatorioController } from '@/application/controllers/relatorio-controller'

export const makeRelatorioController = (): Controller => {
  return new RelatorioController()
}
