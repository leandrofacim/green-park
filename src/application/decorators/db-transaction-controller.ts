import { DbTransaction } from '../contracts/db-transaction'
import { Controller } from '../controllers/controller'
import { HttpResponse } from '../helpers/http'

export class DbTransactionController extends Controller {
  constructor (
    private readonly decorate: Controller,
    private readonly db: DbTransaction
  ) {
    super()
  }

  async execute (httpRequest: any): Promise<HttpResponse> {
    await this.db.openTransaction()
    try {
      const httpResponse = await this.decorate.execute(httpRequest)
      await this.db.commit()
      return httpResponse
    } catch (error) {
      await this.db.rollback()
      throw error
    }
  }
}
