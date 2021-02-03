# Axentrojs

## Axentro wallet and transactions using js/typescript

### Create a wallet

````js
import {StandardWallet, Network} from 'axentrojs';

const wallet = StandardWallet.create(Network.mainnet);
wallet.address();
wallet.exportToWif();
````

### Import a wallet from wif

````js
import {StandardWallet, Network} from 'axentrojs';

const wallet = StandardWallet.importFromWif("...");
wallet.address();
````

### Sign a transaction

````js
import {StandardWallet} from 'axentrojs';

const wallet = StandardWallet.importFromWif("...");
wallet.signTransaction({}, 0);
wallet.address();
````

### Create a hd wallet

````js
import {HdWallet, Network} from 'axentrojs';

const wallet = HdWallet.create(Network.mainnet);
wallet.signTransaction({}, 0);
wallet.address();
````
