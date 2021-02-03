/// <reference types="node" />
import { KeyPair } from './KeyPair';
import { Network } from './Network';
import { Wallet } from './Wallet';
export declare class HdWallet extends Wallet {
    private seed;
    static AXENTRO_OFFSET: number;
    static create(network: Network): HdWallet;
    constructor(seed: Buffer, network: Network, keyPair?: KeyPair);
    derive(path: string): HdWallet;
}
