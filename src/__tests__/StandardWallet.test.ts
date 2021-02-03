import { KeyPair, Network, StandardWallet } from '../index';
import { Transaction, TransactionKind, TransactionVersion } from '../Transaction';

describe('Wallet', () => {
  it('can be created', () => {
    expect(StandardWallet.create(Network.mainnet)).toBeInstanceOf(StandardWallet);
  });

  it('can sign a message', () => {
    const secretKey = Uint8Array.from(
      Buffer.from(
        '56a647e7c817b5cbee64bc2f7a371415441dd1503f004ef12c50f0a6f17093e9',
        'hex',
      ),
    );
    const publicKey = Uint8Array.from(
      Buffer.from('fd94245aeddf19464ffa1b667dea401ed0952ec5a9b4dbf9d652e81c67336c4f', 'hex'),
    );
    const wallet = new StandardWallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);

    expect(wallet.sign(Buffer.from('f3b2e9789f372d456cbbbeee10a4ad7c969acb01017a074d2f51ec047cfb7858'))).toEqual(
      '442f42e88b483ebd8e3f2897918a013a3b6370906f67311fbef6b120dad835cdf4064cdc8ee15e87e86998bf0cbadd653cadbbc6d1f0a5856ff0230a3d437008',
    );
  });

  it('can create an address', () => {
    const publicKey = Buffer.from('bf668c4c446d540452f47b4c10ff85235f5aedb088a90eba8af59cf982489373', 'hex');
    const secretKey = new Buffer('');
    const wallet = new StandardWallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);
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
    const wallet = new StandardWallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);
    const transaction: Transaction = {
      action: 'send',
      id: '8069e6049f7175229f8e05e5cf4cd5dacbc82cad08bfbd251408b6e980d90b04',
      kind: TransactionKind.FAST,
      message: '',
      prev_hash: '0',
      recipients: [],
      scaled: 1,
      senders: [
        {
          address: 'TTAzZGNjOTliNTg4NzIxYzhjZDRiYjJhODlhNjM3MDM5ZWY4NWZjN2ZhOWMxNDk5',
          public_key:
            '48c45b7e45cd415187216452fa22523e002ca042c2bd7205484f29201c3d5806f90e7aeebad37e3fbe01286c25d4027d3f3fec7b5647eff33c07ebd287b57242',
          amount: 500000000000,
          fee: 100000000,
          signature: '0',
        },
      ],
      timestamp: 0,
      token: 'AXNT',
      version: TransactionVersion.V1,
    };

    const signedTransaction = wallet.signTransaction(transaction, 0);

    expect(signedTransaction.senders[0].signature).toEqual(
      '2e4e946373dba812e0ee6d35731743f6d538b3c1161f478f3d83bf67fe759f89c7d3b70f1ec4bf2c2219f025c4678896257bd3241908244dc2eb19c44e1f7a0d',
    );
  });

  it('can be exported as wif', () => {
    const secretKey = Uint8Array.from(
      Buffer.from('f92913f355539a6ec6129b744a9e1dcb4d3c8df29cccb8066d57c454cead6fe4', 'hex'),
    );
    const publicKey = Uint8Array.from(
      Buffer.from('a4b2856bfec510abab89753fac1ac0e1112364e7d250545963f135f2a33188ed', 'hex'),
    );
    const wallet = new StandardWallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);

    const hexWif = wallet.exportToWif();

    expect(hexWif).toEqual(
      'TTBmOTI5MTNmMzU1NTM5YTZlYzYxMjliNzQ0YTllMWRjYjRkM2M4ZGYyOWNjY2I4MDY2ZDU3YzQ1NGNlYWQ2ZmU0MjdlYzNl',
    );
  });

  it('can be imported from wif', () => {
    const secretKey = Buffer.from('f92913f355539a6ec6129b744a9e1dcb4d3c8df29cccb8066d57c454cead6fe4', 'hex');
    const wif = 'TTBmOTI5MTNmMzU1NTM5YTZlYzYxMjliNzQ0YTllMWRjYjRkM2M4ZGYyOWNjY2I4MDY2ZDU3YzQ1NGNlYWQ2ZmU0MjdlYzNl';

    const wallet = StandardWallet.importFromWif(wif);

    expect(wallet.privateKey()).toEqual(secretKey);
  });
});
