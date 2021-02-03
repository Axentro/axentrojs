"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardWallet = void 0;
var KeyPair_1 = require("./KeyPair");
var Wallet_1 = require("./Wallet");
var StandardWallet = /** @class */ (function (_super) {
    __extends(StandardWallet, _super);
    function StandardWallet(keyPair, network) {
        return _super.call(this, keyPair, network) || this;
    }
    StandardWallet.create = function (network) {
        return new StandardWallet(KeyPair_1.KeyPair.create(), network);
    };
    StandardWallet.importFromWif = function (wif) {
        var decoded = Buffer.from(wif, 'base64').toString();
        var network = decoded.substring(0, 2);
        var secretKey = decoded.substring(2, decoded.length - 6);
        return new StandardWallet(KeyPair_1.KeyPair.fromSeed(Buffer.from(secretKey, 'hex')), network);
    };
    StandardWallet.prototype.exportToWif = function () {
        var privateKey = this.keyPair.privateKey().toString('hex');
        var networkKey = this.network.toString() + privateKey;
        var hashedKey = this.sha2(Buffer.from(this.sha2(Buffer.from(networkKey))));
        var checksum = hashedKey.substring(0, 6);
        return Buffer.from(networkKey + checksum).toString('base64');
    };
    return StandardWallet;
}(Wallet_1.Wallet));
exports.StandardWallet = StandardWallet;
