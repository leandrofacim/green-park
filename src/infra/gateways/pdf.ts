import { PDFDocument } from 'pdf-lib'

export const createPDF = async (): Promise<PDFDocument> => {
  return await PDFDocument.create()
}

export const loadPDF = async (path: Buffer): Promise<PDFDocument> => {
  return await PDFDocument.load(path, { updateMetadata: false })
}
