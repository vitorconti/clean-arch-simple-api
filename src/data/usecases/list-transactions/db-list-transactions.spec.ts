import { TransactionModel } from '../../../domain/usecases/list-transaction'
import { ListTransactionsRepository } from '../../protocols/db/list-transactions/list-transactions-repository'
import DbListTransactions from './db-list-transactions'

type SutTypes = {
  sut: DbListTransactions
  listTransactionsRepositoryStub: ListTransactionsRepository
}
const makeListTransactionsRepository = (): ListTransactionsRepository => {
  class ListTransactionsRepositoryStub implements ListTransactionsRepository {
    async loadAll (): Promise<TransactionModel[]> {
      return new Promise(resolve => resolve([]))
    }
  }
  return new ListTransactionsRepositoryStub()
}

const makeSut = (): SutTypes => {
  const listTransactionsRepositoryStub = makeListTransactionsRepository()
  const sut = new DbListTransactions(listTransactionsRepositoryStub)
  return {
    listTransactionsRepositoryStub,
    sut
  }
}

describe('DbListTransactions', () => {
  test('Should call ListTransactionsRepository', async () => {
    const { sut, listTransactionsRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listTransactionsRepositoryStub, 'loadAll')
    await sut.load()
    expect(listSpy).toHaveBeenCalled()
  })
})
