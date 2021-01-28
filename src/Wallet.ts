import { KeyPair } from './KeyPair';
import { Network } from './Network';
import * as crypto from 'crypto';
import { Transaction } from './Transaction';

export class Wallet {
  private keyPair: KeyPair;
  private network: Network;

  static create(network: Network) {
    return new Wallet(KeyPair.create(), network);
  }

  constructor(keyPair: KeyPair, network: Network) {
    this.keyPair = keyPair;
    this.network = network;
  }

  public sign(message: string) {
    return this.keyPair.signData(Buffer.from(message, 'utf8'));
  }

  public publicKey() {
    return Buffer.from(this.keyPair.publicKey());
  }

  public address() {
    const hashedAddress = this.ripemd160(Buffer.from(this.sha2(Buffer.from(this.publicKey().toString('hex')))));
    const networkAddress = this.network.toString() + hashedAddress;
    const hashedAddressAgain = this.sha2(Buffer.from(this.sha2(Buffer.from(networkAddress))));
    const checksum = hashedAddressAgain.substring(0, 6);
    return Buffer.from(networkAddress + checksum).toString('base64');
  }

  public signTransaction(transaction : Transaction, senderIndex : number) : Transaction {
    if(transaction.senders[senderIndex].address !== this.address()) {
      fail("wrong wallet")
    }
    const hash = this.sha2(
      Buffer.from(
        JSON.stringify(transaction)
      )
    );
    const signature = this.sign(hash);
    transaction.senders[senderIndex].signature = signature;
    return transaction;
  }

  public exportToWif() {
    const privateKey = this.keyPair.privateKey().toString('hex');
    const networkKey = this.network.toString() + privateKey;
    const hashedKey = this.sha2(Buffer.from(this.sha2(Buffer.from(networkKey))));
    const checksum = hashedKey.substring(0, 6);
    const encodedKey = Buffer.from(networkKey + checksum).toString('base64');
    return encodedKey;
  }

  private sha2(data: Buffer): string {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest().toString('hex');
  }

  private ripemd160(data: Buffer): string {
    const hash = crypto.createHash('ripemd160');
    hash.update(data);
    return hash.digest().toString('hex');
  }
}
