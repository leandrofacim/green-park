import { Controller } from '@/application/controllers/controller'
import { HttpResponse, noContent } from '@/application/helpers/http'
import ImportCsv from '@/domain/use-cases/import-csv'

interface HttpRequest {
  file: { buffer: Buffer, mimeType: string, path: string }
}

export class ImportCSVController extends Controller {
  constructor (private readonly importCsv: ImportCsv) {
    super()
  }

  async execute (httpRequest: HttpRequest): Promise<HttpResponse<void>> {
    await this.importCsv.execute(httpRequest.file)
    return noContent()
  }
}
