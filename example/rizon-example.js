const rizonjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
// groot-14 means the name of public testnet chain-id of rizon.
const chainId = "groot-14";
// "http://seed-2.testnet.rizon.world" is an endpoint for public testnet of rizon.
const rizon = rizonjs.network("http://seed-2.testnet.rizon.world:1337", chainId);
rizon.setBech32MainPrefix("rizon");
rizon.setPath("m/44'/118'/0'/0/0");
const address = rizon.getAddress(mnemonic);
const ecpairPriv = rizon.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
rizon.getAccounts(address).then(data => {
	let stdSignMsg = rizon.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uatolo = 1 ATOLO)
							denom: "uatolo"
						}
					],
					from_address: address,
					to_address: "rizon10pqkrq4feec3f6c6unyjhh5rnwnsstq3l38k0d"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number),
		sequence: String(data.account.sequence)
	});

	const signedTx = rizon.sign(stdSignMsg, ecpairPriv);
	rizon.broadcast(signedTx).then(response => console.log(response));
})