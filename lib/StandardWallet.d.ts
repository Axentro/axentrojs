import { KeyPair } from './KeyPair';
import { Network } from './Network';
import { Wallet } from './Wallet';
export declare class StandardWallet extends Wallet {
    static create(network: Network): StandardWallet;
    static importFromWif(wif: string): StandardWallet;
    constructor(keyPair: KeyPair, network: Network);
    exportToWif(): string;
}
