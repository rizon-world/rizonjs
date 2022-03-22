const rizonjs = require("../src");
const message = require("../modules/messages/proto.js")

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "uphold pottery knee always follow narrow rich error peasant screen yard similar abandon firm question air acoustic ensure picnic crane category muscle gun patch";
// groot-14 means the name of public testnet chain-id of rizon.
const chainId = "groot-15";
// "http://seed-2.testnet.rizon.world" is an endpoint for public testnet of rizon.
const rizon = rizonjs.network("http://seed-1.testnet.rizon.world:1317", chainId);
rizon.setBech32MainPrefix("rizon");
rizon.setPath("m/44'/118'/0'/0/0");
const address = rizon.getAddress(mnemonic);
const privKey = rizon.getECPairPriv(mnemonic);
const pubKeyAny = rizon.getPubkeyAny(privKey);


// Generate MsgSend transaction and broadcast 
rizon.getAccounts(address).then(data => {
	
	const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
		from_address: address,
		to_address: "rizon1mlk57faq4tx0nk09gs4ep8047ct93y50vch70g",
		amount: [{ denom: "uatolo", amount: String(10000) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
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