/// <reference types="node" />
import { KeyPair } from './KeyPair';
import { Network } from './Network';
import { Transaction } from './Transaction';
export declare abstract class Wallet {
    protected keyPair: KeyPair;
    protected network: Network;
    protected constructor(keyPair: KeyPair, network: Network);
    sign(message: Buffer): string;
    publicKey(): Buffer;
    address(): string;
    privateKey(): Buffer;
    signTransaction(transaction: Transaction, senderIndex: number): Transaction;
    verifySignature(message: string, signature: string): boolean;
    send(amount: number, fee: number, address: string): Transaction;
    protected sha2(data: Buffer): string;
    private ripemd160;
}
