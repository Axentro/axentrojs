import { KeyPair, Wallet } from '../index';
import { SignKeyPair } from 'tweetnacl';

describe('Wallet', () => {
  it('can be created', () => {
    expect(Wallet.create()).toBeInstanceOf(Wallet);
  });

  it('can sign a message', () => {
    const secretKey = Uint8Array.from([
      21, 216,   4,  93,  72, 161, 252,   7, 185,  33, 215,
        27,  11, 249, 176, 157,  52,  36,  80, 118,  52, 239,
        51, 111,  18,  90, 100, 158, 165, 148,  14,   6,  58,
        171, 210,  82, 246,  63, 156,  29, 223, 205,   0, 246,
        125, 207, 208,  31, 254, 166, 153, 126,  89, 246, 127,
        57, 246,  95,  66, 235, 216,  77, 120,  13
      ]);
    const publicKey = Uint8Array.from([
      58, 171, 210,  82, 246,  63, 156, 29,
      223, 205,   0, 246, 125, 207, 208, 31,
      254, 166, 153, 126,  89, 246, 127, 57,
      246,  95,  66, 235, 216,  77, 120, 13
    ]);
    const wallet = new Wallet(new KeyPair({publicKey, secretKey}));

    expect(wallet.sign('hello')).toEqual('73bf3005cabe4d2b4260b1305e88f78b6e61d007fafeec5fd5d18f9f2519e61d740b00f8778ad4c158c7c3a8c10b191fa1d116683bd9aa8c4b792215aeacf50468656c6c6f');
  });
});
