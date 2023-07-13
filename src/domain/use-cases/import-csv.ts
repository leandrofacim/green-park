import Lote from '@/infra/repositories/postgres/entities/lote'
import { IBoletosSave } from '../contracts/repositories/uploa-pdf'
import fs from 'fs'
import { Boleto } from '../entities/botelo'

export interface ILote {
  save: (lotes: Lote[]) => Promise<void>
}

type Result = Array<{ nome: string, unidade: string, valor: string, linha_digitavel: string }>

export default class ImportCsv {
  constructor (
    private readonly lote: ILote,
    private readonly saveBoleto: IBoletosSave
  ) {}

  async execute (file: { buffer: Buffer, mimeType: string, path: string }): Promise<void> {
    const results: Result = []
    const fileStream = fs.createReadStream(file.path, { encoding: 'utf-8' })
    let isFirstLine = true

    fileStream
      .on('data', (data: string) => {
        const lines = data.split('\n')

        for (const line of lines) {
          if (isFirstLine) {
            isFirstLine = false
            continue
          }

          const [nome, unidade, valor, linha_digitavel] = line.split(',')
          results.push({ nome, unidade, valor, linha_digitavel })
        }
      })
      .on('end', async () => {
        const lotes = results.map(row => {
          const lote = new Lote()
          lote.nome = row.unidade
          return lote
        })

        const boletos: Boleto[] = results.map((row) => {
          const boleto = new Boleto()
          boleto.nome_sacado = row.nome
          boleto.valor = Number(row.valor)
          boleto.linha_digitavel = row.linha_digitavel
          boleto.ativo = true
          const batch = lotes.find((lote) => lote.nome === row.unidade)
          boleto.lote = batch as Lote
          return boleto
        })

        await this.lote.save(lotes)
        await this.saveBoleto.save(boletos)
      })
  }
}
