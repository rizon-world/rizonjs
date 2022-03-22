'use strict'

global.fetch || (global.fetch = require('node-fetch').default);
const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32 = require('bech32');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const bitcoinjs = require('bitcoinjs-lib');
const message = require('../modules/messages/proto');
const request = require('request')

let Cosmos = function(url, chainId) {
	this.url = url;
	this.chainId = chainId;
	this.path = "m/44'/118'/0'/0/0";
	this.bech32MainPrefix = "cosmos";
	
	if (!this.url) {
		throw new Error("url object was not set or invalid")
	}
	if (!this.chainId) {
		throw new Error("chainId object was not set or invalid")
	}
}

function network(url, chainId) {
	return new Cosmos(url, chainId);
}

function convertStringToBytes(str) {
	if (typeof str !== "string") {
	    throw new Error("str expects a string")
	}
	var myBuffer = [];
	var buffer = Buffer.from(str, 'utf8');
	for (var i = 0; i < buffer.length; i++) {
	    myBuffer.push(buffer[i]);
	}
	return myBuffer;
}

function getPubKeyBase64(ecpairPriv) {
	const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv);
	return Buffer.from(pubKeyByte, 'binary').toString('base64');
}

function sortObject(obj) {
	if (obj === null) return null;
	if (typeof obj !== "object") return obj;
	if (Array.isArray(obj)) return obj.map(sortObject);
	const sortedKeys = Object.keys(obj).sort();
	const result = {};
	sortedKeys.forEach(key => {
		result[key] = sortObject(obj[key])
	});
	return result;
}

Cosmos.prototype.setBech32MainPrefix = function(bech32MainPrefix) {
	this.bech32MainPrefix = bech32MainPrefix;

	if (!this.bech32MainPrefix) {
		throw new Error("bech32MainPrefix object was not set or invalid")
	}
}

Cosmos.prototype.setPath = function(path) {
	this.path = path;

	if (!this.path) {
		throw new Error("path object was not set or invalid")
	}
}

Cosmos.prototype.getAccounts = function(address) {
	let accountsApi = "/cosmos/auth/v1beta1/accounts/";
	return fetch(this.url + accountsApi + address)
	.then(response => response.json())
}

Cosmos.prototype.getAddress = function(mnemonic, checkSum = true) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	if (checkSum) {
		if (!bip39.validateMnemonic(mnemonic)) throw new Error("mnemonic phrases have invalid checksums");
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(this.path);
	const words = bech32.toWords(child.identifier);
	return bech32.encode(this.bech32MainPrefix, words);
}

Cosmos.prototype.getECPairPriv = function(mnemonic) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(this.path);
	const ecpair = bitcoinjs.ECPair.fromPrivateKey(child.privateKey, {compressed : false})
	return ecpair.privateKey;
}

Cosmos.prototype.getPubkeyAny = function(privKey) {
	const pubKeyByte = secp256k1.publicKeyCreate(privKey);
	var buf1 = new Buffer.from([10]);
	var buf2 = new Buffer.from([pubKeyByte.length]);
	var buf3 = new Buffer.from(pubKeyByte);
	const pubKey = Buffer.concat([buf1, buf2, buf3]);
	const pubKeyAny = new message.google.protobuf.Any({
		type_url: "/cosmos.crypto.secp256k1.PubKey",
		value: pubKey
	});
	return pubKeyAny;
}

Cosmos.prototype.newStdMsg = function(input) {
	const stdSignMsg = new Object;
	stdSignMsg.json = input;
	stdSignMsg.bytes = convertStringToBytes(JSON.stringify(sortObject(stdSignMsg.json)));
	return stdSignMsg;
}


Cosmos.prototype.Sign = function(txBody, authInfo, accountNumber, privKey){

	//cosnt test = new protomessage.
	
	const bodyBytes = message.cosmos.tx.v1beta1.TxBody.encode(txBody).finish();
	const authInfoBytes = message.cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();

	const signDoc = new message.cosmos.tx.v1beta1.SignDoc({
		body_bytes: bodyBytes,
		auth_info_bytes: authInfoBytes,
		chain_id: this.chainId,
		account_number: Number(accountNumber)
	});
	let signMessage = message.cosmos.tx.v1beta1.SignDoc.encode(signDoc).finish();
	const hash = crypto.createHash("sha256").update(signMessage).digest();
	const sig = secp256k1.sign(hash, Buffer.from(privKey));
	const txRaw = new message.cosmos.tx.v1beta1.TxRaw({
		body_bytes: bodyBytes,
		auth_info_bytes: authInfoBytes,
		signatures: [sig.signature],
	});
	const txBytes = message.cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish();
	const txBytesBase64 = Buffer.from(txBytes, 'binary').toString('base64');
	return txBytes;
}
Cosmos.prototype.broadcast = function(signedTxBytes, broadCastMode = "BROADCAST_MODE_SYNC") {
	const txBytesBase64 = Buffer.from(signedTxBytes, 'binary').toString('base64');
		console.log(txBytesBase64)
		var options = { 
			method: 'POST',
			url: this.url + '/cosmos/tx/v1beta1/txs',
			headers: 
			{ 'Content-Type': 'application/json' },
			body: { tx_bytes: txBytesBase64, mode: broadCastMode },
			json: true 
		};

		return new Promise(function(resolve, reject){
	        request(options, function (error, response, body) {
	            if (error) return reject(error);
	            try {
	                resolve(body);
	            } catch(e) {
	                reject(e);
	            }
	        });
	    });
}
module.exports = {
	network: network
}
