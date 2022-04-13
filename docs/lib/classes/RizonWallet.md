# Class: RizonWallet

## Hierarchy

- **`RizonWallet`**

  ↳ [`RizonLedgerWallet`](RizonLedgerWallet.md)

  ↳ [`RizonPaperWallet`](RizonPaperWallet.md)

## Table of contents

### Constructors

- [constructor](RizonWallet.md#constructor)

### Properties

- [address](RizonWallet.md#address)
- [publicKey](RizonWallet.md#publickey)

### Methods

- [canChangeAccount](RizonWallet.md#canchangeaccount)
- [getAddress](RizonWallet.md#getaddress)
- [getPublicKey](RizonWallet.md#getpublickey)
- [sign](RizonWallet.md#sign)
- [signMessage](RizonWallet.md#signmessage)
- [signTransaction](RizonWallet.md#signtransaction)
- [signingMode](RizonWallet.md#signingmode)
- [useAccount](RizonWallet.md#useaccount)

## Constructors

### constructor

• **new RizonWallet**()

## Properties

### address

• `Protected` `Optional` **address**: `string`

___

### publicKey

• `Protected` `Optional` **publicKey**: `Uint8Array`

## Methods

### canChangeAccount

▸ `Abstract` **canChangeAccount**(): `boolean`

Whether or not the wallet support changing account
Basically only wallet initialized using a private key should not be able to do so

**`see`** [RizonWallet.useAccount](RizonWallet.md#useaccount)

#### Returns

`boolean`

___

### getAddress

▸ **getAddress**(): `string`

Gets the current wallet address

**`see`** [RizonWallet.useAccount](RizonWallet.md#useaccount)

#### Returns

`string`

wallet address (Bech32)

___

### getPublicKey

▸ **getPublicKey**(): `Uint8Array`

Gets the current wallet public key

**`see`** [RizonWallet.useAccount](RizonWallet.md#useaccount)

#### Returns

`Uint8Array`

wallet public key (secp256k1)

___

### sign

▸ `Abstract` **sign**(`data`): `Promise`<`Uint8Array`\>

Sign a raw payload.
This method might not be available for all types of wallets such as Ledger.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | the payload to sign directly |

#### Returns

`Promise`<`Uint8Array`\>

___

### signMessage

▸ `Abstract` **signMessage**(`msg`): `Promise`<[`SignMsg`](../interfaces/RizonTypes.SignMsg.md)\>

Sign a message using a RizonWallet
Provided for signature generation and verification as signature will depend on the wallet payload implementation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | message to sign |

#### Returns

`Promise`<[`SignMsg`](../interfaces/RizonTypes.SignMsg.md)\>

___

### signTransaction

▸ `Abstract` **signTransaction**(`doc`): `Promise`<[[`SignDoc`](../interfaces/RizonTypes.SignDoc.md), `Uint8Array`]\>

Sign a transaction document using a RizonWallet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `doc` | [`Doc`](../interfaces/RizonTypes.Doc.md) | document to sign |

#### Returns

`Promise`<[[`SignDoc`](../interfaces/RizonTypes.SignDoc.md), `Uint8Array`]\>

___

### signingMode

▸ `Abstract` **signingMode**(): `SignMode`

Gets the wallet signin mode

#### Returns

`SignMode`

___

### useAccount

▸ `Abstract` **useAccount**(`hdPath`, `addressPrefix`): `Promise`<`boolean`\>

Change the wallet to use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hdPath` | `string` | BIP44 HD Path |
| `addressPrefix` | `string` | prefix to use (ex: rizon) |

#### Returns

`Promise`<`boolean`\>
