import { HttpResponse, ok } from '@/application/helpers/http'
import { Controller } from './controller'
import RetrieveBoleto from '@/domain/use-cases/retrieve-boleto'
import { Boleto } from '@/domain/entities/botelo'

interface HttpRequest {
  nome?: string
  valor_inicial?: number
  valor_final?: number
  id_lote?: number
}

export default class RetrieveBoletoController extends Controller {
  constructor (private readonly retrieveBoleto: RetrieveBoleto) {
    super()
  }

  async execute (httpRequest: HttpRequest): Promise<HttpResponse<Boleto[]>> {
    return ok(await this.retrieveBoleto.execute(httpRequest))
  }
}
