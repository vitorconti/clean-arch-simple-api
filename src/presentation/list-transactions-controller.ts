import { ListTransaction } from '../domain/usecases/list-transaction';
import { ok } from './helpers/http/http-helper';
import { Controller } from './protocols/controller';
import { HttpRequest, HttpResponse } from './protocols/http';

export default class ListTransactionsController implements Controller {
  constructor (private readonly listTransactions: ListTransaction) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const transactions = await this.listTransactions.load()
    return ok(transactions)
  }
}