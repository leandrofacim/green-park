import { createPDF, loadPDF } from '@/infra/gateways/pdf'
import fs from 'fs'
import { IBoletos } from '../contracts/repositories/uploa-pdf'

export default class UploadPdf {
  constructor (private readonly boletos: IBoletos) {}

  async execute (file: {
    buffer: Buffer
    mimeType: string
    path: string
  }): Promise<void> {
    const filePath = fs.readFileSync(file.path)
    const pdfDoc = await loadPDF(filePath)
    const totalPages = pdfDoc.getPageCount()

    const boletos = await this.boletos.all()

    const singlePageDocs = []
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const singlePageDoc = await createPDF()
      const [copiedPage] = await singlePageDoc.copyPages(pdfDoc, [pageIndex])

      singlePageDoc.addPage(copiedPage)
      singlePageDocs.push(singlePageDoc)
    }

    const singlePageBytes = await Promise.all(
      singlePageDocs.map(async (doc) => await doc.save())
    )

    boletos.forEach((boleto, index) => {
      fs.writeFileSync(`./boletos/${boleto.id}.pdf`, singlePageBytes[index])
    })
  }
}
