import { sign, SignKeyPair } from 'tweetnacl';

export class KeyPair {
  private naclKeyPair: SignKeyPair;

  static create(): KeyPair {
    return new KeyPair(sign.keyPair());
  }

  static fromPrivateKey(privateKey: Buffer) {
    const keyPair = sign.keyPair.fromSecretKey(Uint8Array.from(privateKey));
    return new KeyPair(keyPair);
  }

  static fromSeed(seed : Buffer) {
    const keyPair = sign.keyPair.fromSeed(Uint8Array.from(seed));
    return new KeyPair(keyPair);
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

  public privateKey() {
    return Buffer.from(this.naclKeyPair.secretKey).slice(0, 32);
  }
}
