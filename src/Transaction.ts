import {randomBytes} from 'crypto';
export interface Transaction {
  id: string
  action: string
  senders : Sender[]
  recipients: Recipient[]
  message: string
  token: string
  prev_hash: string
  timestamp: number
  scaled: number
  kind: TransactionKind
  version: TransactionVersion
}

export enum TransactionKind {
  SLOW = 'SLOW',
  FAST = 'FAST'
}

export enum TransactionVersion {
  V1 = 'V1'
}

export interface Sender {
  address: string,
  public_key: string,
  amount: string,
  fee: string,
  signature?: string
}

export interface Recipient {
  address: string,
  amount: string
}

export function transactionIdGenerator() : string {
  const tmpId = randomBytes(32).toString('hex');
  if (tmpId[0] === "0") {
    return transactionIdGenerator();
  }
  return tmpId;
}
