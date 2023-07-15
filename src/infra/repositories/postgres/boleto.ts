import { PgRepository } from './repository'
import Boleto from './entities/boleto'
import { IBoletos, IBoletosSave } from '@/domain/contracts/repositories/uploa-pdf'
import { IRetrieveBoleto } from '@/domain/use-cases/retrieve-boleto'

export class BoletoRepository extends PgRepository implements IBoletos, IBoletosSave, IRetrieveBoleto {
  async get (input: {
    nome?: string
    valor_inicial?: number
    valor_final?: number
    id_lote?: number
  }): Promise<Boleto[]> {
    const boletoRepository = this.getRepository(Boleto)

    const query = boletoRepository.createQueryBuilder('boleto')
      .leftJoinAndSelect('boleto.lote', 'lote')

    if (input.nome !== undefined) {
      query.where('boleto.nome_sacado LIKE :nome', { nome: input.nome })
    }

    if (input.id_lote !== undefined) {
      query.where('lote.id = :lote', { lote: input.id_lote })
    }

    return await query.getMany()
  }

  async save (boletos: Boleto[]): Promise<void> {
    const boletoRepository = this.getRepository(Boleto)
    await boletoRepository.save(boletos)
  }

  async all (): Promise<Boleto[]> {
    const boletoRepository = this.getRepository(Boleto)
    return await boletoRepository.find()
  }
}
