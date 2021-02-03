/// <reference types="node" />
import { SignKeyPair } from 'tweetnacl';
export declare class KeyPair {
    private naclKeyPair;
    private ec;
    static create(): KeyPair;
    static fromSeed(seed: Buffer): KeyPair;
    constructor(naclKeyPair: SignKeyPair);
    signData(data: Buffer): string;
    verifySignature(message: string, signature: string): boolean;
    publicKey(): Uint8Array;
    privateKey(): Buffer;
}
