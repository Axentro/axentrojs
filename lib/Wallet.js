"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
var KeyPair_1 = require("./KeyPair");
var Wallet = /** @class */ (function () {
    function Wallet(keyPair) {
        this.keyPair = keyPair;
    }
    Wallet.create = function () {
        return new Wallet(KeyPair_1.KeyPair.create());
    };
    Wallet.prototype.sign = function (message) {
        return this.keyPair.signData(Buffer.from(message, 'utf8'));
    };
    return Wallet;
}());
exports.Wallet = Wallet;
