"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var Transaction_1 = require("./Transaction");
var crypto = __importStar(require("crypto"));
var Wallet = /** @class */ (function () {
    function Wallet(keyPair, network) {
        this.keyPair = keyPair;
        this.network = network;
    }
    Wallet.prototype.sign = function (message) {
        return this.keyPair.signData(message);
    };
    Wallet.prototype.publicKey = function () {
        return Buffer.from(this.keyPair.publicKey());
    };
    Wallet.prototype.address = function () {
        var hashedAddress = this.ripemd160(Buffer.from(this.sha2(Buffer.from(this.publicKey().toString('hex')))));
        var networkAddress = this.network.toString() + hashedAddress;
        var hashedAddressAgain = this.sha2(Buffer.from(this.sha2(Buffer.from(networkAddress))));
        var checksum = hashedAddressAgain.substring(0, 6);
        return Buffer.from(networkAddress + checksum).toString('base64');
    };
    Wallet.prototype.privateKey = function () {
        return Buffer.from(this.keyPair.privateKey());
    };
    Wallet.prototype.signTransaction = function (transaction, senderIndex) {
        if (transaction.senders[senderIndex].address !== this.address()) {
            fail('wrong wallet');
        }
        var hash = this.sha2(Buffer.from(JSON.stringify(transaction)));
        transaction.senders[senderIndex].signature = this.sign(Buffer.from(hash));
        return transaction;
    };
    Wallet.prototype.verifySignature = function (message, signature) {
        return this.keyPair.verifySignature(message, signature);
    };
    Wallet.prototype.send = function (amount, fee, address) {
        return this.signTransaction({
            id: Transaction_1.transactionIdGenerator(),
            action: "send",
            senders: [{
                    address: this.address(),
                    public_key: this.publicKey().toString('hex'),
                    amount: amount,
                    fee: fee,
                    signature: "0"
                }],
            recipients: [{
                    address: address,
                    amount: amount
                }],
            message: "",
            token: 'AXNT',
            prev_hash: "0",
            timestamp: Math.floor(Date.now() / 1000),
            scaled: 1,
            kind: Transaction_1.TransactionKind.SLOW,
            version: Transaction_1.TransactionVersion.V1
        }, 0);
    };
    Wallet.prototype.sha2 = function (data) {
        var hash = crypto.createHash('sha256');
        hash.update(data);
        return hash.digest().toString('hex');
    };
    Wallet.prototype.ripemd160 = function (data) {
        var hash = crypto.createHash('ripemd160');
        hash.update(data);
        return hash.digest().toString('hex');
    };
    return Wallet;
}());
exports.Wallet = Wallet;
