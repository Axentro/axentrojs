/// <reference types="node" />
import { SignKeyPair } from 'tweetnacl';
export declare class KeyPair {
    private naclKeyPair;
    static create(): KeyPair;
    constructor(naclKeyPair: SignKeyPair);
    signData(data: Buffer): string;
}
