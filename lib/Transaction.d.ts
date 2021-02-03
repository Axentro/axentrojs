export interface Transaction {
    id: string;
    action: string;
    senders: Sender[];
    recipients: Recipient[];
    message: string;
    token: string;
    prev_hash: string;
    timestamp: number;
    scaled: number;
    kind: TransactionKind;
    version: TransactionVersion;
}
export declare enum TransactionKind {
    SLOW = "SLOW",
    FAST = "FAST"
}
export declare enum TransactionVersion {
    V1 = "V1"
}
export interface Sender {
    address: string;
    public_key: string;
    amount: number;
    fee: number;
    signature: string;
}
export interface Recipient {
    address: string;
    amount: number;
}
export declare function transactionIdGenerator(): string;
