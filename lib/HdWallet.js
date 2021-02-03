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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HdWallet = void 0;
var ed25519_hd_key_1 = require("ed25519-hd-key");
var crypto_1 = __importDefault(require("crypto"));
var KeyPair_1 = require("./KeyPair");
var Wallet_1 = require("./Wallet");
var HdWallet = /** @class */ (function (_super) {
    __extends(HdWallet, _super);
    function HdWallet(seed, network, keyPair) {
        var _this = this;
        var key = ed25519_hd_key_1.getMasterKeyFromSeed(seed.toString('hex')).key;
        if (keyPair == null) {
            _this = _super.call(this, KeyPair_1.KeyPair.fromSeed(key), network) || this;
        }
        else {
            _this = _super.call(this, keyPair, network) || this;
        }
        _this.seed = seed;
        return _this;
    }
    HdWallet.create = function (network) {
        var seed = crypto_1.default.randomBytes(32);
        return new HdWallet(seed, network);
    };
    HdWallet.prototype.derive = function (path) {
        var key = ed25519_hd_key_1.derivePath(path, this.seed.toString('hex'), HdWallet.AXENTRO_OFFSET).key;
        return new HdWallet(this.seed, this.network, KeyPair_1.KeyPair.fromSeed(Buffer.from(key)));
    };
    HdWallet.AXENTRO_OFFSET = 0x80000276;
    return HdWallet;
}(Wallet_1.Wallet));
exports.HdWallet = HdWallet;
