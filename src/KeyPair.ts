import { sign, SignKeyPair } from 'tweetnacl';
import * as elliptic from 'elliptic';

export class KeyPair {
  private naclKeyPair: SignKeyPair;
  private ec: elliptic.eddsa;

  static create(): KeyPair {
    return new KeyPair(sign.keyPair());
  }

  static fromSeed(seed : Buffer) {
    const keyPair = sign.keyPair.fromSeed(Uint8Array.from(seed));
    return new KeyPair(keyPair);
  }

  constructor(naclKeyPair: SignKeyPair) {
    this.naclKeyPair = naclKeyPair;
    this.ec = new elliptic.eddsa('ed25519');
  }

  public signData(data: Buffer): string {
    const key = this.ec.keyFromSecret(this.privateKey());
    return key.sign(data).toHex().toLowerCase();
  }

  public verifySignature(message: string, signature: string) {
    const key = this.ec.keyFromPublic(Buffer.from(this.publicKey()).toString('hex'));
    return key.verify(message, signature);
  }

  public publicKey() {
    return this.naclKeyPair.publicKey;
  }

  public privateKey() {
    return Buffer.from(this.naclKeyPair.secretKey).slice(0, 32);
  }
}
