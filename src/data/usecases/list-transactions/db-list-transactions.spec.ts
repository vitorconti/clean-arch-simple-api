import { TransactionModel, TransactionStatus } from '../../../domain/usecases/list-transaction'
import { ListTransactionsRepository } from '../../protocols/db/list-transactions/list-transactions-repository'
import DbListTransactions from './db-list-transactions'

type SutTypes = {
  sut: DbListTransactions
  listTransactionsRepositoryStub: ListTransactionsRepository
}
const makeFakeTransactions = () => {
  return [
    {
      transactionId: "123456789",
      accountId: "987654321",
      amount: 100.50,
      timestamp: new Date('2024-04-08'),
      description: "Payment for groceries",
      category: "Food",
      status: TransactionStatus.Completed
    }
  ]
}
const makeListTransactionsRepository = (): ListTransactionsRepository => {
  class ListTransactionsRepositoryStub implements ListTransactionsRepository {
    async loadAll (): Promise<TransactionModel[]> {
      return new Promise(resolve => resolve(makeFakeTransactions()))
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
  test('Should return a ListTransactionsModel on success', async () => {
    const { sut } = makeSut()
    const transactions = await sut.load()
    expect(transactions).toEqual(makeFakeTransactions())
  })
})
