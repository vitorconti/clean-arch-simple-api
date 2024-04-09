import { ListTransaction, TransactionModel } from '../../../domain/usecases/list-transaction';
import { ListTransactionsRepository } from '../../protocols/db/list-transactions/list-transactions-repository';

export default class DbListTransactions implements ListTransaction {
  constructor (private readonly listTransactionRepository: ListTransactionsRepository) { }
  async load (): Promise<TransactionModel[]> {
    await this.listTransactionRepository.loadAll()
    return await new Promise(resolve => resolve([]))
  }
}