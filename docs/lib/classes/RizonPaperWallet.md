# Class: RizonPaperWallet

## Hierarchy

- [`RizonWallet`](RizonWallet.md)

  ↳ **`RizonPaperWallet`**

## Table of contents

### Constructors

- [constructor](RizonPaperWallet.md#constructor)

### Properties

- [address](RizonPaperWallet.md#address)
- [mnemonic](RizonPaperWallet.md#mnemonic)
- [privateKey](RizonPaperWallet.md#privatekey)
- [publicKey](RizonPaperWallet.md#publickey)

### Methods

- [canChangeAccount](RizonPaperWallet.md#canchangeaccount)
- [getAddress](RizonPaperWallet.md#getaddress)
- [getPublicKey](RizonPaperWallet.md#getpublickey)
- [sign](RizonPaperWallet.md#sign)
- [signMessage](RizonPaperWallet.md#signmessage)
- [signTransaction](RizonPaperWallet.md#signtransaction)
- [signingMode](RizonPaperWallet.md#signingmode)
- [useAccount](RizonPaperWallet.md#useaccount)

## Constructors

### constructor

• **new RizonPaperWallet**(`mnemonicOrPrivateKey`)

Create a RizonPaperWallet instance based on a mnemonic or a private key
This constructor is not intended to be used directly as it does not initialize the underlying key pair
Better use the provided static RizonPaperWallet builders

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonicOrPrivateKey` | `string` \| `Uint8Array` | mnemonic (string) used to derive the private key or private key (Uint8Array) |

#### Overrides

[RizonWallet](RizonWallet.md).[constructor](RizonWallet.md#constructor)

## Properties

### address

• `Protected` `Optional` **address**: `string`

#### Inherited from

[RizonWallet](RizonWallet.md).[address](RizonWallet.md#address)

___

### mnemonic

• `Private` `Optional` `Readonly` **mnemonic**: `string`

___

### privateKey

• `Private` `Optional` **privateKey**: `Uint8Array`

___

### publicKey

• `Protected` `Optional` **publicKey**: `Uint8Array`

#### Inherited from

[RizonWallet](RizonWallet.md).[publicKey](RizonWallet.md#publickey)

## Methods

### canChangeAccount

▸ **canChangeAccount**(): `boolean`

Whether or not the wallet support changing account
Basically only wallet initialized using a private key should not be able to do so

#### Returns

`boolean`

#### Overrides

[RizonWallet](RizonWallet.md).[canChangeAccount](RizonWallet.md#canchangeaccount)

___

### getAddress

▸ **getAddress**(): `string`

Gets the current wallet address

**`see`** [RizonWallet.useAccount](RizonWallet.md#useaccount)

#### Returns

`string`

wallet address (Bech32)

#### Inherited from

[RizonWallet](RizonWallet.md).[getAddress](RizonWallet.md#getaddress)

___

### getPublicKey

▸ **getPublicKey**(): `Uint8Array`

Gets the current wallet public key

**`see`** [RizonWallet.useAccount](RizonWallet.md#useaccount)

#### Returns

`Uint8Array`

wallet public key (secp256k1)

#### Inherited from

[RizonWallet](RizonWallet.md).[getPublicKey](RizonWallet.md#getpublickey)

___

### sign

▸ **sign**(`data`): `Promise`<`Uint8Array`\>

Sign a raw payload.
This method might not be available for all types of wallets such as Ledger.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |

#### Returns

`Promise`<`Uint8Array`\>

#### Overrides

[RizonWallet](RizonWallet.md).[sign](RizonWallet.md#sign)

___

### signMessage

▸ **signMessage**(`msg`): `Promise`<[`SignMsg`](../interfaces/RizonTypes.SignMsg.md)\>

Sign a message using a RizonWallet
Provided for signature generation and verification as signature will depend on the wallet payload implementation

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Returns

`Promise`<[`SignMsg`](../interfaces/RizonTypes.SignMsg.md)\>

#### Overrides

[RizonWallet](RizonWallet.md).[signMessage](RizonWallet.md#signmessage)

___

### signTransaction

▸ **signTransaction**(`doc`): `Promise`<[[`SignDoc`](../interfaces/RizonTypes.SignDoc.md), `Uint8Array`]\>

Sign a transaction document using a RizonWallet

#### Parameters

| Name | Type |
| :------ | :------ |
| `doc` | [`Doc`](../interfaces/RizonTypes.Doc.md) |

#### Returns

`Promise`<[[`SignDoc`](../interfaces/RizonTypes.SignDoc.md), `Uint8Array`]\>

#### Overrides

[RizonWallet](RizonWallet.md).[signTransaction](RizonWallet.md#signtransaction)

___

### signingMode

▸ **signingMode**(): `SignMode`

Gets the wallet signin mode

#### Returns

`SignMode`

#### Overrides

[RizonWallet](RizonWallet.md).[signingMode](RizonWallet.md#signingmode)

___

### useAccount

▸ **useAccount**(`hdPath?`, `addressPrefix?`): `Promise`<`boolean`\>

Change the wallet to use

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hdPath` | `string` | `undefined` |
| `addressPrefix` | `string` | `RizonConstants.RizonBech32PrefixAccAddr` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[RizonWallet](RizonWallet.md).[useAccount](RizonWallet.md#useaccount)
