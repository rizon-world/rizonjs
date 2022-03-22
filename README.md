<h1 align="center">
    RizonJS
</h1>

A JavasSript Open Source Library for RIZON Blockchain.

## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server, which acts as an intermediary between the front-end and the full-node.

### Git

```bash
git clone https://github.com/rizon-world/rizonjs.git
git checkout features/support_magnus
```

## Import 

#### NodeJS

```js
const rizonjs = require("../src");
const message = require("../modules/messages/proto.js")
```


## Usage
- Rizon: Generate Rizon address from mnemonic 
```js
const rizonjs = require("../src");
const message = require("../modules/messages/proto.js")

const chainId = "groot-15";
const rizon = rizonjs.network(lcdUrl, chainId);

const mnemonic = "..."
rizon.setPath("m/44'/118'/0'/0/0");
const address = rizon.getAddress(mnemonic);
const ecpairPriv = rizon.getECPairPriv(mnemonic);
```

Generate ECPairPriv value that is needed for signing signatures
```js
const ecpairPriv = rizon.getECPairPriv(mnemonic);
```

Transfer ATOLO to designated address. 
* Make sure to input proper type, account number, and sequence of the cosmos account to generate protobuf structure. You can get those account information on blockchain. Protobuf signing is different from Amino signing.
```js
rizon.getAccounts(address).then(data => {
	
	const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
		from_address: address,
		to_address: "rizon1mlk57faq4tx0nk09gs4ep8047ct93y50vch70g",
		amount: [{ denom: "uatolo", amount: String(10000) }]		// 6 decimal places (1000000 uatolo = 1 ATOLO)
	});

	const msgSendAny = new message.google.protobuf.Any({
		type_url: "/cosmos.bank.v1beta1.MsgSend",
		value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: "" });

	const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
		public_key: pubKeyAny,
		mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
		sequence: data.account.sequence
	});

	const feeValue = new message.cosmos.tx.v1beta1.Fee({
		amount: [{ denom: "uatolo", amount: String(5000) }],
		gas_limit: 200000
	});

	const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

	const signedTxBytes = rizon.Sign(txBody, authInfo, data.account.account_number, privKey);
	rizon.broadcast(signedTxBytes).then(response => console.log(response));

});
```

Sign transaction by using stdSignMsg and broadcast by using the Rizon REST API(LCD)
```js
const signedTx = rizon.sign(stdSignMsg, ecpairPriv);
rizon.broadcast(signedTx).then(response => console.log(response));
```

## Supporting Message Types
- If you need more message types, you can see [/docs/msg_types](https://github.com/rizon-world/rizonjs/tree/features/support_magnus/docs/msg_types)
