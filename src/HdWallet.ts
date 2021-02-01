import { derivePath, getMasterKeyFromSeed } from 'ed25519-hd-key';
import crypto from 'crypto';
import { KeyPair } from './KeyPair';
import { Network } from './Network';
import { Wallet } from './Wallet';

export class HdWallet extends Wallet{
  private seed: Buffer;

  static AXENTRO_OFFSET = 0x80000276;

  static create(network: Network) {
    const seed = crypto.randomBytes(32);
    return new HdWallet(seed, network);
  }

  constructor(seed: Buffer, network: Network, keyPair?: KeyPair) {
    const { key } = getMasterKeyFromSeed(seed.toString('hex'));
    if (keyPair == null) {
      super(KeyPair.fromSeed(key), network);
    }
    else {
      super(keyPair, network)
    }
    this.seed = seed;
  }

  public derive(path : string) {
    const {key} =  derivePath(path, this.seed.toString('hex'), HdWallet.AXENTRO_OFFSET);
    return new HdWallet(this.seed, this.network, KeyPair.fromSeed(Buffer.from(key)));
  }
}
