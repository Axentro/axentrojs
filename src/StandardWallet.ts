import { KeyPair } from './KeyPair';
import { Network } from './Network';
import { Wallet } from './Wallet';

export class StandardWallet extends Wallet {
  static create(network: Network) {
    return new StandardWallet(KeyPair.create(), network);
  }

  static importFromWif(wif: string) {
    const decoded = Buffer.from(wif, 'base64').toString();
    const network = decoded.substring(0, 2) as Network;
    const secretKey = decoded.substring(2, decoded.length - 6);
    return new StandardWallet(KeyPair.fromSeed(Buffer.from(secretKey, 'hex')), network);
  }

  constructor(keyPair: KeyPair, network: Network) {
    super(keyPair, network);
  }

  public exportToWif() {
    const privateKey = this.keyPair.privateKey().toString('hex');
    const networkKey = this.network.toString() + privateKey;
    const hashedKey = this.sha2(Buffer.from(this.sha2(Buffer.from(networkKey))));
    const checksum = hashedKey.substring(0, 6);
    return Buffer.from(networkKey + checksum).toString('base64');
  }
}
