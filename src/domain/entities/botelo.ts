import Lote from '@/infra/repositories/postgres/entities/lote'

export class Boleto {
  nome_sacado!: string
  valor!: number
  linha_digitavel!: string
  ativo!: boolean
  lote!: Partial<Lote>
  created_at!: Date
  updated_at!: Date
  readonly id!: string
}
