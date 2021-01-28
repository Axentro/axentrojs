import { KeyPair, Network, Wallet } from '../index';
import { Transaction, transactionIdGenerator, TransactionKind, TransactionVersion } from '../Transaction';

describe('Wallet', () => {
  it('can be created', () => {
    expect(Wallet.create(Network.mainnet)).toBeInstanceOf(Wallet);
  });

  it('can sign a message', () => {
    const secretKey = Uint8Array.from(
      Buffer.from(
        '15d8045d48a1fc07b921d71b0bf9b09d3424507634ef336f125a649ea5940e063aabd252f63f9c1ddfcd00f67dcfd01ffea6997e59f67f39f65f42ebd84d780d',
        'hex',
      ),
    );
    const publicKey = Uint8Array.from(
      Buffer.from('3aabd252f63f9c1ddfcd00f67dcfd01ffea6997e59f67f39f65f42ebd84d780d', 'hex'),
    );
    const wallet = new Wallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);

    expect(wallet.sign('hello')).toEqual(
      '73bf3005cabe4d2b4260b1305e88f78b6e61d007fafeec5fd5d18f9f2519e61d740b00f8778ad4c158c7c3a8c10b191fa1d116683bd9aa8c4b792215aeacf50468656c6c6f',
    );
  });

  it('can create an address', () => {
    const publicKey = Buffer.from('bf668c4c446d540452f47b4c10ff85235f5aedb088a90eba8af59cf982489373', 'hex');
    const secretKey = new Buffer('');
    const wallet = new Wallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);
    expect(wallet.address()).toEqual('TTA5OGFmMWM5MzEzOTg4OWVjNGMyNjVmNmY1ZWMwMzhlN2M3ZWMwZGFkZjdhYWU0');
  });

  it('can sign a transaction', () => {
    const secretKey = Uint8Array.from(
      Buffer.from(
        '15d8045d48a1fc07b921d71b0bf9b09d3424507634ef336f125a649ea5940e063aabd252f63f9c1ddfcd00f67dcfd01ffea6997e59f67f39f65f42ebd84d780d',
        'hex',
      ),
    );
    const publicKey = Uint8Array.from(
      Buffer.from('3aabd252f63f9c1ddfcd00f67dcfd01ffea6997e59f67f39f65f42ebd84d780d', 'hex'),
    );
    const wallet = new Wallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);
    const transaction: Transaction = {
      action: "send",
      id: "8069e6049f7175229f8e05e5cf4cd5dacbc82cad08bfbd251408b6e980d90b04",
      kind: TransactionKind.FAST,
      message: "",
      prev_hash: "0",
      recipients: [],
      scaled: 0,
      senders: [{
        address: "VDBkYWQxZjZlZjllOTAzYzNiODQ0NmZkZTI4NDBhYmMzYjUxYThjM2E1ZjNkODlj",
        public_key: "48c45b7e45cd415187216452fa22523e002ca042c2bd7205484f29201c3d5806f90e7aeebad37e3fbe01286c25d4027d3f3fec7b5647eff33c07ebd287b57242",
        amount: '500000000000',
        fee: '100000000',
        signature: "0"
      }],
      timestamp: 0,
      token: "AXNT",
      version: TransactionVersion.V1
    };

    const signedTransaction = wallet.signTransaction(transaction, 0);

    expect(signedTransaction.senders[0].signature).toEqual('19a089f0981f242da3d0197714d625152a6826448cf4588769234b9fddada4e8a2e2e5e4e79fea3f0f376245bfb75bf0318d3c5c6118f9308b07c8e63d38d80d39306662663637353866346230646637333662666637363064343530373137656364623533663538353164333132633462313130363132303265346332626661');
  });
});
