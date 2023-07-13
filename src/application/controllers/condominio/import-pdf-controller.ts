import { Controller } from '@/application/controllers/controller'
import { HttpResponse, ok, serverError } from '@/application/helpers/http'
import { createPDF } from '@/infra/gateways/pdf'
import { BoletoRepository } from '@/infra/repositories/postgres/boleto'
import Boleto from '@/infra/repositories/postgres/entities/boleto'
import fs from 'fs'

interface HttpRequest {
  file: { buffer: Buffer, mimeType: string, path: string }
}

export class ImportPDFController extends Controller {
  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const boletoRepository = new BoletoRepository().getRepository(Boleto)

      const boletos = await boletoRepository.find()
      const pdfPath = `boletos-${Date.now()}.pdf`

      const doc = await createPDF()

      for (const boleto of boletos) {
        doc.addPage().drawText(
          `${boleto.id} ` +
          `${boleto.nome_sacado} \n`,
          {
            x: 25,
            y: 100,
            size: 16,
            lineHeight: 24,
            opacity: 0.75
          }
        )
      }

      const pdfBytes = await doc.save()

      fs.writeFileSync('boletos.pdf', pdfBytes)

      return ok({ path: pdfPath })
    } catch (error) {
      return serverError(error)
    }
  }
}
