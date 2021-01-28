import { sign, SignKeyPair } from 'tweetnacl';

export class KeyPair {
  private naclKeyPair: SignKeyPair;

  static create(): KeyPair {
    return new KeyPair(sign.keyPair());
  }

  constructor(naclKeyPair: SignKeyPair) {
    this.naclKeyPair = naclKeyPair;
  }

  public signData(data: Buffer): string {
    const signature = sign(Uint8Array.from(data), this.naclKeyPair.secretKey);
    return Buffer.from(signature).toString('hex');
  }

  public publicKey() {
    return this.naclKeyPair.publicKey;
  }
}
