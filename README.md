# Axentrojs

## Axentro wallet and transactions using js/typescript

### Create a wallet

````js
import {StandardWallet, Network} from 'axentrojs';

const wallet = StandardWallet.create(Network.mainnet);
console.log(wallet.address());
````

### Import/export a wallet from wif

````js
import {StandardWallet} from 'axentrojs';

const wallet = StandardWallet.importFromWif("...");
console.log(wallet.address());
console.log(wallet.exportToWif());
````

### Sign a transaction

````js
import {StandardWallet} from 'axentrojs';

const wallet = StandardWallet.importFromWif("...");
wallet.signTransaction({...}, 0);
wallet.address();
````

### Create a hd wallet

````js
import {HdWallet, Network} from 'axentrojs';

const wallet = HdWallet.create(Network.mainnet);
wallet.signTransaction({...}, 0);
wallet.address();
````

### Send token

````js
import {StandardWallet, AxentroNode} from 'axentrojs';

const node = new AxentroNode('https://testnet.axentro.io/api/v1');
const wallet = StandardWallet.importFromWif("...");
// send 1 AXNT to address
const tx = wallet.createAndSignTransaction(100000000, "address");
await node.broadcastTransaction(tx);
````
