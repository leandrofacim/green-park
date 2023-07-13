import { PgRepository } from './repository'
import Boleto from './entities/boleto'
import { IBoletos, IBoletosSave } from '@/domain/contracts/repositories/uploa-pdf'

export class BoletoRepository extends PgRepository implements IBoletos, IBoletosSave {
  async save (boletos: Boleto[]): Promise<void> {
    const boletoRepository = this.getRepository(Boleto)
    await boletoRepository.save(boletos)
  }

  async all (): Promise<Boleto[]> {
    const boletoRepository = this.getRepository(Boleto)
    return await boletoRepository.find()
  }
}
