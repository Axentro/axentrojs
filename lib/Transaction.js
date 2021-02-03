"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionIdGenerator = exports.TransactionVersion = exports.TransactionKind = void 0;
var crypto_1 = require("crypto");
var TransactionKind;
(function (TransactionKind) {
    TransactionKind["SLOW"] = "SLOW";
    TransactionKind["FAST"] = "FAST";
})(TransactionKind = exports.TransactionKind || (exports.TransactionKind = {}));
var TransactionVersion;
(function (TransactionVersion) {
    TransactionVersion["V1"] = "V1";
})(TransactionVersion = exports.TransactionVersion || (exports.TransactionVersion = {}));
function transactionIdGenerator() {
    var tmpId = crypto_1.randomBytes(32).toString('hex');
    if (tmpId[0] === '0') {
        return transactionIdGenerator();
    }
    return tmpId;
}
exports.transactionIdGenerator = transactionIdGenerator;
