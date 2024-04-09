import { ListTransaction } from '../domain/usecases/list-transaction';
import { Controller } from './protocols/controller';
import { HttpRequest, HttpResponse } from './protocols/http';

export default class ListTransactionsController implements Controller {
  constructor (private readonly listTransactions: ListTransaction) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.listTransactions.load()
    return {
      body: {},
      statusCode: 200
    }
  }
}