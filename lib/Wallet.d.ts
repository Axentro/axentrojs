import { KeyPair } from './KeyPair';
export declare class Wallet {
    private keyPair;
    static create(): Wallet;
    constructor(keyPair: KeyPair);
    sign(message: string): string;
}
