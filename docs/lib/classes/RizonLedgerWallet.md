# Class: RizonLedgerWallet

## Hierarchy

- [`RizonWallet`](RizonWallet.md)

  ↳ **`RizonLedgerWallet`**

## Table of contents

### Constructors

- [constructor](RizonLedgerWallet.md#constructor)

### Properties

- [address](RizonLedgerWallet.md#address)
- [cosmosApp](RizonLedgerWallet.md#cosmosapp)
- [hdPath](RizonLedgerWallet.md#hdpath)
- [publicKey](RizonLedgerWallet.md#publickey)

### Methods

- [canChangeAccount](RizonLedgerWallet.md#canchangeaccount)
- [getAddress](RizonLedgerWallet.md#getaddress)
- [getAppConfiguration](RizonLedgerWallet.md#getappconfiguration)
- [getPublicKey](RizonLedgerWallet.md#getpublickey)
- [sign](RizonLedgerWallet.md#sign)
- [signMessage](RizonLedgerWallet.md#signmessage)
- [signTransaction](RizonLedgerWallet.md#signtransaction)
- [signingMode](RizonLedgerWallet.md#signingmode)
- [useAccount](RizonLedgerWallet.md#useaccount)

## Constructors

### constructor

• **new RizonLedgerWallet**(`transport`, `scrambleKey?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `transport` | `default` | `undefined` |
| `scrambleKey` | `string` | `'CSM'` |

#### Overrides

[RizonWallet](RizonWallet.md).[constructor](RizonWallet.md#constructor)

## Properties

### address

• `Protected` `Optional` **address**: `string`

#### Inherited from

[RizonWallet](RizonWallet.md).[address](RizonWallet.md#address)

___

### cosmosApp

• **cosmosApp**: `default`

___

### hdPath

• `Private` `Optional` **hdPath**: `string`

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

### getAppConfiguration

▸ **getAppConfiguration**(): `Promise`<`Object`\>

Gets the connected application configuration

#### Returns

`Promise`<`Object`\>

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

▸ **sign**(): `Promise`<`Uint8Array`\>

Sign a raw payload.
This method might not be available for all types of wallets such as Ledger.

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

▸ **useAccount**(`hdPath`, `addressPrefix`): `Promise`<`boolean`\>

Change the wallet to use

#### Parameters

| Name | Type |
| :------ | :------ |
| `hdPath` | `string` |
| `addressPrefix` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Overrides

[RizonWallet](RizonWallet.md).[useAccount](RizonWallet.md#useaccount)
