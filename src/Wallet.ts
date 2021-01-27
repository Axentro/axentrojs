import { KeyPair } from './KeyPair';

export class Wallet {
  private keyPair: KeyPair;
  static create() {
    return new Wallet(KeyPair.create());
  }

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  public sign(message: string) {
    return this.keyPair.signData(Buffer.from(message, 'utf8'));
  }
}
