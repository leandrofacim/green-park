import Boleto from '@/infra/repositories/postgres/entities/boleto'
import { IRetrieveBoleto } from '../contracts/repositories/boletos'

interface Input {
  nome?: string
  valor_inicial?: number
  valor_final?: number
  id_lote?: number
}

export default class RetrieveBoleto {
  constructor (private readonly retrieveBoleto: IRetrieveBoleto) {}
  async execute (input: Input): Promise<Boleto[]> {
    return await this.retrieveBoleto.get(input)
  }
}
