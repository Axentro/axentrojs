import { HdWallet } from '../HdWallet';
import { Network } from '../Network';

describe('HdWallet', () => {
  it('can be instantiated from a seed', () => {
    const hexSeed = '000102030405060708090a0b0c0d0e0f';

    const hdWallet = new HdWallet(Buffer.from(hexSeed, 'hex'), Network.mainnet);

    expect(hdWallet.privateKey().toString('hex')).toEqual('2b4be7f19ee27bbf30c667b642d5f4aa69fd169872f8fc3059c08ebae2eb19e7');
    expect(hdWallet.publicKey().toString('hex')).toEqual('a4b2856bfec510abab89753fac1ac0e1112364e7d250545963f135f2a33188ed');
  });

  it('can be derived', () => {
    const hexSeed = '000102030405060708090a0b0c0d0e0f';
    const path = "m/0'";
    const hdWallet = new HdWallet(Buffer.from(hexSeed, 'hex'), Network.mainnet);

    const derivedWallet = hdWallet.derive(path);

    expect(derivedWallet.privateKey().toString('hex')).toEqual('433acfc3055954411068990af648eb8a24b85b40b76db87661592e4fda13fdc7');
    expect(derivedWallet.publicKey().toString('hex')).toEqual('883c44f8eb19e5ca570ab371c2cc6212b8099cb25c5fb0f66a3645a06069b836');
  });
});
