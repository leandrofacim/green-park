import { HttpResponse, ok } from '@/application/helpers/http'
import { Controller } from '../controller'
import UploadPdf from '@/domain/use-cases/upload-pdf'

interface HttpRequest {
  file: {
    buffer: Buffer
    mimeType: string
    path: string
  }
}

export class UploadPDFController extends Controller {
  constructor (private readonly service: UploadPdf) {
    super()
  }

  async execute (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.service.execute(httpRequest.file)

    return ok({ data: httpRequest })
  }
}
