import { ILote } from '@/domain/use-cases/import-csv'
import { PgRepository } from './repository'
import Lote from './entities/lote'

export class LoteRepository extends PgRepository implements ILote {
  async save (lotes: Lote[]): Promise<void> {
    const loteRepository = this.getRepository(Lote)
    await loteRepository.save(lotes)
  }
}
