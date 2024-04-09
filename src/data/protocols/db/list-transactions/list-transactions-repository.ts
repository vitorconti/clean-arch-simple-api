import { TransactionModel } from '../../../../domain/usecases/list-transaction';

export interface ListTransactionsRepository {
  loadAll: () => Promise<TransactionModel[]>
}