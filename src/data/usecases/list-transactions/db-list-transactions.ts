import { ListTransaction, TransactionModel } from '../../../domain/usecases/list-transaction';
import { ListTransactionsRepository } from '../../protocols/db/list-transactions/list-transactions-repository';

export default class DbListTransactions implements ListTransaction {
  constructor (private readonly listTransactionRepository: ListTransactionsRepository) { }
  async load (): Promise<TransactionModel[]> {
    return await this.listTransactionRepository.loadAll()
  }
}