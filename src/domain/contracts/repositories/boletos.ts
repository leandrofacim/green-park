import { Boleto } from '@/domain/entities/botelo'

export interface IRetrieveBoleto {
  get: (input: IRetrieveBoleto.Input) => Promise<Boleto[]>
}

export namespace IRetrieveBoleto {
  export interface Input {
    nome?: string
    valor_inicial?: number
    valor_final?: number
    id_lote?: number
  }
}
