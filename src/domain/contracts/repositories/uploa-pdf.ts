import Boleto from '@/infra/repositories/postgres/entities/boleto'

export interface IBoletos {
  all: () => Promise<Boleto[]>
}

export interface IBoletosSave {
  save: (boleto: Boleto[]) => Promise<void>
}
