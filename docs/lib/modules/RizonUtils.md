# Namespace: RizonUtils

## Table of contents

### Interfaces

- [KeyStore](../interfaces/RizonUtils.KeyStore.md)

### Functions

- [accountFromAny](RizonUtils.md#accountfromany)
- [broadcastTxCommitSuccess](RizonUtils.md#broadcasttxcommitsuccess)
- [broadcastTxSyncSuccess](RizonUtils.md#broadcasttxsyncsuccess)
- [convertUnit](RizonUtils.md#convertunit)
- [estimatedVesting](RizonUtils.md#estimatedvesting)
- [generateAuthInfoBytes](RizonUtils.md#generateauthinfobytes)
- [generateKeyStore](RizonUtils.md#generatekeystore)
- [generateMnemonic](RizonUtils.md#generatemnemonic)
- [generatePrivateKey](RizonUtils.md#generateprivatekey)
- [generateSignDoc](RizonUtils.md#generatesigndoc)
- [generateSignDocBytes](RizonUtils.md#generatesigndocbytes)
- [generateSignature](RizonUtils.md#generatesignature)
- [generateTxBytes](RizonUtils.md#generatetxbytes)
- [getAddressFromPublicKey](RizonUtils.md#getaddressfrompublickey)
- [getPrivateKeyFromKeystore](RizonUtils.md#getprivatekeyfromkeystore)
- [getPrivateKeyFromMnemonic](RizonUtils.md#getprivatekeyfrommnemonic)
- [getPrivateKeyFromSeed](RizonUtils.md#getprivatekeyfromseed)
- [getPublicKeyFromPrivateKey](RizonUtils.md#getpublickeyfromprivatekey)
- [getSeedFromMnemonic](RizonUtils.md#getseedfrommnemonic)
- [isAddressValid](RizonUtils.md#isaddressvalid)
- [keyFromHex](RizonUtils.md#keyfromhex)
- [keyToHex](RizonUtils.md#keytohex)
- [parseAttribute](RizonUtils.md#parseattribute)
- [parseEvent](RizonUtils.md#parseevent)
- [parseLog](RizonUtils.md#parselog)
- [parseLogs](RizonUtils.md#parselogs)
- [parseRawLogs](RizonUtils.md#parserawlogs)
- [publicKeyToProto](RizonUtils.md#publickeytoproto)
- [searchTxByBlockHeight](RizonUtils.md#searchtxbyblockheight)
- [searchTxByTags](RizonUtils.md#searchtxbytags)
- [searchTxFrom](RizonUtils.md#searchtxfrom)
- [searchTxTo](RizonUtils.md#searchtxto)
- [sha3](RizonUtils.md#sha3)
- [sortJSON](RizonUtils.md#sortjson)
- [toJSON](RizonUtils.md#tojson)
- [uint8IndexOf](RizonUtils.md#uint8indexof)
- [verifySignMsg](RizonUtils.md#verifysignmsg)
- [verifySignature](RizonUtils.md#verifysignature)

## Functions

### accountFromAny

▸ `Const` **accountFromAny**(`input`): [`Account`](../interfaces/RizonTypes.Account.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `Any` |

#### Returns

[`Account`](../interfaces/RizonTypes.Account.md)

___

### broadcastTxCommitSuccess

▸ `Const` **broadcastTxCommitSuccess**(`response`): `boolean`

Returns true if transaction made it successfully into a block
(i.e. success in `check_tx` and `deliver_tx` field)

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `BroadcastTxCommitResponse` |

#### Returns

`boolean`

___

### broadcastTxSyncSuccess

▸ `Const` **broadcastTxSyncSuccess**(`res`): `boolean`

Returns true if transaction made it sucessfully into the transaction pool

#### Parameters

| Name | Type |
| :------ | :------ |
| `res` | `BroadcastTxSyncResponse` |

#### Returns

`boolean`

___

### convertUnit

▸ `Const` **convertUnit**(`coin`, `toDenom`): `string`

Converts the Coin amount into the destination denom.
This method does not do any actual math and only "move" the floating precision of the amoun in order to avoid any
possible floating point precision issue.
It does nothing if src denom = dst denom.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `coin` | [`Coin`](../interfaces/RizonTypes.Coin.md) | Coin to convert into toDenom |
| `toDenom` | `string` | destination denom to convert into |

#### Returns

`string`

the amount converted

___

### estimatedVesting

▸ `Const` **estimatedVesting**(`account`, `t?`, `denom?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `account` | [`Account`](../interfaces/RizonTypes.Account.md) | `undefined` |
| `t?` | `Date` | `undefined` |
| `denom` | `string` | `RizonConstants.MicroRizonDenom` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `endsAt` | `Date` |
| `lockedBankCoins` | [`Coin`](../interfaces/RizonTypes.Coin.md) |
| `lockedCoins` | [`Coin`](../interfaces/RizonTypes.Coin.md) |
| `lockedDelegatedCoins` | [`Coin`](../interfaces/RizonTypes.Coin.md) |
| `lockedPercentage` | `number` |
| `startsAt` | `Date` |
| `time` | `Date` |
| `totalCoins` | [`Coin`](../interfaces/RizonTypes.Coin.md) |
| `unlockedCoins` | [`Coin`](../interfaces/RizonTypes.Coin.md) |
| `unlockedPercentage` | `number` |

___

### generateAuthInfoBytes

▸ `Const` **generateAuthInfoBytes**(`docSigners`, `fee`, `signMode`): `Uint8Array`

Generate transaction auth info payload

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `docSigners` | [`DocSigner`](../interfaces/RizonTypes.DocSigner.md)[] | Document signers |
| `fee` | [`Fee`](../interfaces/RizonTypes.Fee.md) | requested fee |
| `signMode` | `SignMode` | signing mode |

#### Returns

`Uint8Array`

___

### generateKeyStore

▸ `Const` **generateKeyStore**(`privateKey`, `password`): [`KeyStore`](../interfaces/RizonUtils.KeyStore.md)

Generate a KeyStore using a privateKey and a password

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `Uint8Array` | private key to encrypt in the keystore |
| `password` | `string` | keystore password |

#### Returns

[`KeyStore`](../interfaces/RizonUtils.KeyStore.md)

___

### generateMnemonic

▸ `Const` **generateMnemonic**(`words?`): `string`

Generate a random mnemonic of 12 or 24 words

**`see`** https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `words` | ``12`` \| ``24`` | `12` | The number of words requested |

#### Returns

`string`

___

### generatePrivateKey

▸ `Const` **generatePrivateKey**(): `Uint8Array`

Generates a cryptographically secure random private key

#### Returns

`Uint8Array`

___

### generateSignDoc

▸ `Const` **generateSignDoc**(`doc`, `signerIdx`, `signMode`): [`SignDoc`](../interfaces/RizonTypes.SignDoc.md)

Generate transaction doc to be signed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`Doc`](../interfaces/RizonTypes.Doc.md) | document to create the sign version |
| `signerIdx` | `number` | index of the signer in the signers field used to specify the accountNumber for signature purpose |
| `signMode` | `SignMode` | signing mode for the transaction |

#### Returns

[`SignDoc`](../interfaces/RizonTypes.SignDoc.md)

___

### generateSignDocBytes

▸ `Const` **generateSignDocBytes**(`signDoc`): `Uint8Array`

Generate transaction sign doc bytes used to sign the transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signDoc` | [`SignDoc`](../interfaces/RizonTypes.SignDoc.md) | sign doc (as generated by the generateSignDoc function) |

#### Returns

`Uint8Array`

___

### generateSignature

▸ `Const` **generateSignature**(`hashedMessage`, `privateKey`): `Promise`<`Uint8Array`\>

Generate transaction signature

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashedMessage` | `Uint8Array` | sha256 hash of the sign doc bytes (as generated by the generateSignDocBytes function) |
| `privateKey` | `Uint8Array` | private key used to sign the transaction (secp256k1) |

#### Returns

`Promise`<`Uint8Array`\>

___

### generateTxBytes

▸ `Const` **generateTxBytes**(`signDoc`, `signatures`): `Uint8Array`

Generate transaction bytes to broadcast

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signDoc` | [`SignDoc`](../interfaces/RizonTypes.SignDoc.md) | sign doc (as generated by the generateSignDoc function) |
| `signatures` | `Uint8Array`[] | transaction signatures (as generated by the generateSignature function) |

#### Returns

`Uint8Array`

___

### getAddressFromPublicKey

▸ `Const` **getAddressFromPublicKey**(`publicKey`, `prefix?`): `string`

Derives a bech32 wallet address from a public key (secp256k1)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | `undefined` | public key to derive the address from |
| `prefix` | `string` | `RizonBech32PrefixAccAddr` | address prefix to use (ex: rizon) |

#### Returns

`string`

___

### getPrivateKeyFromKeystore

▸ `Const` **getPrivateKeyFromKeystore**(`keystore`, `password`): `Uint8Array`

Decyphers the private key from the provided KeyStore

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keystore` | `string` \| [`KeyStore`](../interfaces/RizonUtils.KeyStore.md) | keystore data (either stringified or loaded) |
| `password` | `string` | keystore password |

#### Returns

`Uint8Array`

___

### getPrivateKeyFromMnemonic

▸ `Const` **getPrivateKeyFromMnemonic**(`mnemonic`, `hdPath?`): `Promise`<`Uint8Array`\>

Get the derivated private key from the provided mnemonic

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | mnemonic phrase |
| `hdPath` | `string` | derivation path to use |

#### Returns

`Promise`<`Uint8Array`\>

___

### getPrivateKeyFromSeed

▸ `Const` **getPrivateKeyFromSeed**(`seed`, `hdPath?`): `Uint8Array`

Get the derivated private key from the provided seed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `Uint8Array` | to derive the private key from |
| `hdPath` | `string` | derivation path to use |

#### Returns

`Uint8Array`

___

### getPublicKeyFromPrivateKey

▸ `Const` **getPublicKeyFromPrivateKey**(`privateKey`): `Promise`<`Uint8Array`\>

Get a public key from a private key (secp256k1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `privateKey` | `Uint8Array` | private key to get the public key from |

#### Returns

`Promise`<`Uint8Array`\>

___

### getSeedFromMnemonic

▸ `Const` **getSeedFromMnemonic**(`mnemonic`): `Promise`<`Uint8Array`\>

Get the seed from a mnemonic phrase

**`see`** https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | english mnemonic phrase |

#### Returns

`Promise`<`Uint8Array`\>

___

### isAddressValid

▸ `Const` **isAddressValid**(`address`, `prefix?`): `boolean`

Verify that a wallet address is valid

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `address` | `string` | `undefined` | address to check |
| `prefix` | `undefined` \| `string` | `RizonBech32PrefixAccAddr` | prefix to check (will not be checked if not provided) |

#### Returns

`boolean`

___

### keyFromHex

▸ `Const` **keyFromHex**(`hexKey`): `Uint8Array`

Convert an hex key into its Uint8Array verison

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexKey` | `string` | hexadecimal key to convert |

#### Returns

`Uint8Array`

___

### keyToHex

▸ `Const` **keyToHex**(`key`, `xPrefix?`): `string`

Convert a Uint8Array key into its hexadecimal version

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `Uint8Array` | `undefined` | (should be secp256k1 but works with anything though) |
| `xPrefix` | `boolean` | `false` | whether or not to prefix the returned hex value by "0x" |

#### Returns

`string`

___

### parseAttribute

▸ `Const` **parseAttribute**(`input`): [`LogAttribute`](../interfaces/RizonTypes.LogAttribute.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

[`LogAttribute`](../interfaces/RizonTypes.LogAttribute.md)

___

### parseEvent

▸ `Const` **parseEvent**(`input`): [`LogEvent`](../interfaces/RizonTypes.LogEvent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

[`LogEvent`](../interfaces/RizonTypes.LogEvent.md)

___

### parseLog

▸ `Const` **parseLog**(`input`): [`Log`](../interfaces/RizonTypes.Log.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

[`Log`](../interfaces/RizonTypes.Log.md)

___

### parseLogs

▸ `Const` **parseLogs**(`input`): readonly [`Log`](../interfaces/RizonTypes.Log.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `unknown` |

#### Returns

readonly [`Log`](../interfaces/RizonTypes.Log.md)[]

___

### parseRawLogs

▸ `Const` **parseRawLogs**(`input?`): readonly [`Log`](../interfaces/RizonTypes.Log.md)[]

Parse raw transaction logs into human readable format

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `string` | `'[]'` | transaction log (for tx returned by the client you can use tx.result.log) |

#### Returns

readonly [`Log`](../interfaces/RizonTypes.Log.md)[]

___

### publicKeyToProto

▸ `Const` **publicKeyToProto**(`publicKey`): `Any`

Converts a public key into its protorpc version

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | public key to convert into proto |

#### Returns

`Any`

___

### searchTxByBlockHeight

▸ `Const` **searchTxByBlockHeight**(`height`): `string`

Create a search query by block height

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `height` | `number` | block height |

#### Returns

`string`

___

### searchTxByTags

▸ `Const` **searchTxByTags**(`tags`, `minHeight?`, `maxHeight?`): `string`

Create a search query by tags

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tags` | { `key`: `string` ; `value`: `string`  }[] | tags to search for |
| `minHeight?` | `number` | min block height (filter) |
| `maxHeight?` | `number` | max block height (filter) |

#### Returns

`string`

___

### searchTxFrom

▸ `Const` **searchTxFrom**(`senderAddress`, `minHeight?`, `maxHeight?`): `string`

Create a search query by sender address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `senderAddress` | `string` | wallet address (bech32) |
| `minHeight?` | `number` | min block height (filter) |
| `maxHeight?` | `number` | max block height (filter) |

#### Returns

`string`

___

### searchTxTo

▸ `Const` **searchTxTo**(`recipientAddress`, `minHeight?`, `maxHeight?`): `string`

Create a search query by recipient address

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recipientAddress` | `string` | wallet address (bech32) |
| `minHeight?` | `number` | min block height (filter) |
| `maxHeight?` | `number` | max block height (filter) |

#### Returns

`string`

___

### sha3

▸ `Const` **sha3**(`hex`): `string`

Sha3 hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hex` | `string` | hex bytes to hash |

#### Returns

`string`

___

### sortJSON

▸ `Const` **sortJSON**<`T`\>(`jsonObj`): `T`

Sorts an object properties recursively.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonObj` | `T` | object to sort |

#### Returns

`T`

a new object with keys sorted alphabetically

___

### toJSON

▸ `Const` **toJSON**(`data`): `unknown`

Converts the provided data recursively in order to obtain a json usable version by removing
complex types and making it serializable

- Uint8Array will be converted to HEX
- Date will be converted to ISO string
- Anything else will not be touched

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `unknown` | data to convert (can be anything) |

#### Returns

`unknown`

___

### uint8IndexOf

▸ `Const` **uint8IndexOf**(`arr`, `elem`): `number`

Find the index of an Uint8Array element in an array of Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `Uint8Array`[] | Array to search elem |
| `elem` | `Uint8Array` | Elem to search in array |

#### Returns

`number`

The index of the element in the array or -1

___

### verifySignMsg

▸ `Const` **verifySignMsg**(`msg`): `Promise`<`boolean`\>

Verify that a message is signed by the provided publicKey
Will also verify that the address is indeed derivated by the provided publicKey

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | [`SignMsg`](../interfaces/RizonTypes.SignMsg.md) | Message to verify such as generated by the RizonWallet.signMessage method |

#### Returns

`Promise`<`boolean`\>

___

### verifySignature

▸ `Const` **verifySignature**(`signature`, `signedBytes`, `publicKey`): `Promise`<`boolean`\>

Verify that a signature is valid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signature` | `Uint8Array` | signature (as generated by the generateSignature function) |
| `signedBytes` | `Uint8Array` | signed bytes (as generated by the generateSignDocBytes function or by the signMessage function) |
| `publicKey` | `Uint8Array` | public key of the signing key pair (secp256k1) |

#### Returns

`Promise`<`boolean`\>
