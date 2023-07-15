import { HttpResponse, ok, serverError } from '@/application/helpers/http'
import { Controller } from './controller'
import { BoletoRepository } from '@/infra/repositories/postgres/boleto'
import Boleto from '@/infra/repositories/postgres/entities/boleto'
import { createPDF } from '@/infra/gateways/pdf'
import { PageSizes } from 'pdf-lib'

export class RelatorioController extends Controller {
  async execute (httpRequest: any): Promise<HttpResponse<any>> {
    try {
      const boletoRepository = new BoletoRepository().getRepository(Boleto)
      const boletos = await boletoRepository.find({ relations: ['lote'] })

      const doc = await createPDF()
      const page = doc.addPage(PageSizes.A4)
      const { width, height } = page.getSize()

      const table = {
        headers: ['ID', 'ID Lote', 'Valor', 'Linha Digitável', 'Nome Sacado'],
        rows: boletos.map((boleto) => [
          boleto.id?.toString(),
          boleto.lote.id?.toString(),
          boleto.valor,
          boleto.linha_digitavel,
          boleto.nome_sacado
        ])
      }

      const tableWidth = width * 0.8
      const cellMargin = 20
      const lineHeight = 20
      const extraColumnWidth = 60

      let currentY = height - cellMargin
      table.headers.forEach((header, index) => {
        const xPos =
          cellMargin +
          (tableWidth / table.headers.length) * index +
          (index === table.headers.length - 1 ? extraColumnWidth : 0)

        page.drawText(header, {
          x: xPos,
          y: currentY,
          size: 12
        })
      })

      currentY -= lineHeight
      table.rows.forEach((row) => {
        row.forEach((cell, columnIndex) => {
          const xPos =
            cellMargin +
            (tableWidth / table.headers.length) * columnIndex +
            (columnIndex === 4 ? extraColumnWidth : 0)

          page.drawText(String(cell), {
            x: xPos,
            y: currentY,
            size: 12
          })
        })

        currentY -= lineHeight
      })

      const pdfBytes = await doc.saveAsBase64()
      return ok({ base64: pdfBytes })
    } catch (error) {
      return serverError(error)
    }
  }
}
