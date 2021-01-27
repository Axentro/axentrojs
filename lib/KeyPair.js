"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
var tweetnacl_1 = require("tweetnacl");
var KeyPair = /** @class */ (function () {
    function KeyPair(naclKeyPair) {
        this.naclKeyPair = naclKeyPair;
    }
    KeyPair.create = function () {
        return new KeyPair(tweetnacl_1.sign.keyPair());
    };
    KeyPair.prototype.signData = function (data) {
        var signature = tweetnacl_1.sign(Uint8Array.from(data), this.naclKeyPair.secretKey);
        return Buffer.from(signature).toString('hex');
    };
    return KeyPair;
}());
exports.KeyPair = KeyPair;
