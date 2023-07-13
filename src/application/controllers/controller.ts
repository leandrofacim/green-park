import { HttpResponse, serverError } from '../helpers/http'

export abstract class Controller {
  abstract execute (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.execute(httpRequest)
    } catch (error) {
      return serverError(error)
    }
  }
}
