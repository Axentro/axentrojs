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
exports.KeyPair = void 0;
var tweetnacl_1 = require("tweetnacl");
var elliptic = __importStar(require("elliptic"));
var KeyPair = /** @class */ (function () {
    function KeyPair(naclKeyPair) {
        this.naclKeyPair = naclKeyPair;
        this.ec = new elliptic.eddsa('ed25519');
    }
    KeyPair.create = function () {
        return new KeyPair(tweetnacl_1.sign.keyPair());
    };
    KeyPair.fromSeed = function (seed) {
        var keyPair = tweetnacl_1.sign.keyPair.fromSeed(Uint8Array.from(seed));
        return new KeyPair(keyPair);
    };
    KeyPair.prototype.signData = function (data) {
        var key = this.ec.keyFromSecret(this.privateKey());
        return key.sign(data).toHex().toLowerCase();
    };
    KeyPair.prototype.verifySignature = function (message, signature) {
        var key = this.ec.keyFromPublic(Buffer.from(this.publicKey()).toString('hex'));
        return key.verify(message, signature);
    };
    KeyPair.prototype.publicKey = function () {
        return this.naclKeyPair.publicKey;
    };
    KeyPair.prototype.privateKey = function () {
        return Buffer.from(this.naclKeyPair.secretKey).slice(0, 32);
    };
    return KeyPair;
}());
exports.KeyPair = KeyPair;
