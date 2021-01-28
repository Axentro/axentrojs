import { KeyPair, Network, Wallet } from '../index';

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

  it('can be created', () => {
    const publicKey = Buffer.from('bf668c4c446d540452f47b4c10ff85235f5aedb088a90eba8af59cf982489373', 'hex');
    const secretKey = new Buffer('');
    const wallet = new Wallet(new KeyPair({ publicKey, secretKey }), Network.mainnet);
    expect(wallet.address()).toEqual('TTA5OGFmMWM5MzEzOTg4OWVjNGMyNjVmNmY1ZWMwMzhlN2M3ZWMwZGFkZjdhYWU0');
  });
});
