export interface TransactionModel {
  transactionId: string;
  accountId: string;
  amount: number;
  timestamp: Date;
  description: string;
  category: string;
  status: TransactionStatus;
}

export enum TransactionStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled'
}

export interface ListTransaction {
  load (): Promise<TransactionModel[]>
}