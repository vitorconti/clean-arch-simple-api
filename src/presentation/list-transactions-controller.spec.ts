import ListTransactionsController from './list-transactions-controller'
import { ListTransaction, TransactionModel, TransactionStatus } from '../domain/usecases/list-transaction'
import { ok } from './helpers/http/http-helper'

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

const makeListTransaction = (): ListTransaction => {
  class ListTransactionStub implements ListTransaction {
    load (): Promise<TransactionModel[]> {
      return new Promise(resolve => resolve(makeFakeTransactions()))
    }
  }
  return new ListTransactionStub()
}


type SutTypes = {
  sut: ListTransactionsController
  listTransactionStub: ListTransaction
}
const makeSut = (): SutTypes => {
  const listTransactionStub = makeListTransaction()
  const sut = new ListTransactionsController(listTransactionStub)
  return {
    sut,
    listTransactionStub
  }
}

describe('ListTransactionsController', () => {
  test('Should call list transactions', async () => {
    const { sut, listTransactionStub } = makeSut()
    const loadSpy = jest.spyOn(listTransactionStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 if succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(ok(makeFakeTransactions()))
  })
})
