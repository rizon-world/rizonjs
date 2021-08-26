<h1 align="center">
    RizonJS
</h1>

A JavasSript Open Source Library for Rizon.

## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server, which acts as an intermediary between the front-end and the full-node.

### Git

```bash
git clone https://github.com/dogesa-dac/rizonjs
```

## Import 

#### NodeJS

```js
const rizonjs = require("rizonjs");
```

#### ES6 module
```js
import rizonjs from "rizonjs";
```

#### Browser script

- You can see example file at /example/browser-example.html

```js
<script src="../dist/rizon.js"></script>
```

## Usage
- Rizon: Generate Rizon address from mnemonic 
```js
const rizonjs = require("rizonjs");

const chainId = "groot-011";
const rizon = rizonjs.network(lcdUrl, chainId);

const mnemonic = "..."
rizon.setPath("m/44'/1217'/0'/0/0");
const address = rizon.getAddress(mnemonic);
const ecpairPriv = rizon.getECPairPriv(mnemonic);
```

Generate ECPairPriv value that is needed for signing signatures
```js
const ecpairPriv = rizon.getECPairPriv(mnemonic);
```

Transfer ATOLO to designated address. 
* Make sure to input proper type, account number, and sequence of the rizon account to generate StdSignMsg. You can get those account information on blockchain
```js
rizon.getAccounts(address).then(data => {
	let stdSignMsg = rizon.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000),
							denom: "uatolo"
						}
					],
					from_address: address,
					to_address: "rizon1xjdla8awqz8kw74sakdh969t7mm4ypwdwnj435"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number),
		sequence: String(data.account.sequence)
	});

	...
})
```

Sign transaction by using stdSignMsg and broadcast by using the Rizon REST API(LCD)
```js
const signedTx = rizon.sign(stdSignMsg, ecpairPriv);
rizon.broadcast(signedTx).then(response => console.log(response));
```

## Supporting Message Types
- If you need more message types, you can see /docs/msg_types