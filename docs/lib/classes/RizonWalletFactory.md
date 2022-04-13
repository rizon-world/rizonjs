# Class: RizonWalletFactory

## Table of contents

### Constructors

- [constructor](RizonWalletFactory.md#constructor)

### Methods

- [fromKeyStore](RizonWalletFactory.md#fromkeystore)
- [fromLedgerTransport](RizonWalletFactory.md#fromledgertransport)
- [fromMnemonic](RizonWalletFactory.md#frommnemonic)
- [fromOfflineSigner](RizonWalletFactory.md#fromofflinesigner)
- [fromPrivateKey](RizonWalletFactory.md#fromprivatekey)

## Constructors

### constructor

• **new RizonWalletFactory**()

## Methods

### fromKeyStore

▸ `Static` **fromKeyStore**(`keystore`, `password`, `addressPrefix?`): `Promise`<[`RizonWallet`](RizonWallet.md)\>

Create a RizonWallet instance based on a keystore

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `keystore` | `string` \| [`KeyStore`](../interfaces/RizonUtils.KeyStore.md) | `undefined` | keystore used to decypher the private key |
| `password` | `string` | `undefined` | keystore password |
| `addressPrefix` | `string` | `RizonConstants.RizonBech32PrefixAccAddr` | prefix to use to derive the address from the public key (ex: rizon) |

#### Returns

`Promise`<[`RizonWallet`](RizonWallet.md)\>

___

### fromLedgerTransport

▸ `Static` **fromLedgerTransport**(`transport`, `hdPath?`, `addressPrefix?`): `Promise`<[`RizonWallet`](RizonWallet.md)\>

Create a RizonWallet instance based on a ledger transport

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `transport` | `default` | `undefined` | Ledger transport to use (https://github.com/LedgerHQ/ledgerjs) |
| `hdPath` | `string` | `undefined` | BIP44 derivation path |
| `addressPrefix` | `string` | `RizonConstants.RizonBech32PrefixAccAddr` | prefix to use to derive the address from the public key (ex: rizon) |

#### Returns

`Promise`<[`RizonWallet`](RizonWallet.md)\>

___

### fromMnemonic

▸ `Static` **fromMnemonic**(`mnemonic`, `hdPath?`, `addressPrefix?`): `Promise`<[`RizonWallet`](RizonWallet.md)\>

Create a RizonWallet instance based on a mnemonic and a derivation path

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `mnemonic` | `string` | `undefined` | mnemonic used to derive the private key |
| `hdPath` | `string` | `undefined` | BIP44 derivation path |
| `addressPrefix` | `string` | `RizonConstants.RizonBech32PrefixAccAddr` | prefix to use to derive the address from the public key (ex: rizon) |

#### Returns

`Promise`<[`RizonWallet`](RizonWallet.md)\>

___

### fromOfflineSigner

▸ `Static` **fromOfflineSigner**(`offlineSigner`): `Promise`<[`RizonWallet`](RizonWallet.md)\>

Create a RizonWallet instance based on an OfflineDirectSigner instance compatible with Comsjs based implementations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offlineSigner` | `OfflineSigner` | OfflineDirectSigner instance compatible with Comsjs based implementations |

#### Returns

`Promise`<[`RizonWallet`](RizonWallet.md)\>

___

### fromPrivateKey

▸ `Static` **fromPrivateKey**(`privateKey`, `addressPrefix?`): `Promise`<[`RizonWallet`](RizonWallet.md)\>

Create a RizonWallet instance based on a private key (secp256k1)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `privateKey` | `Uint8Array` | `undefined` | wallet private key (secp256k1) |
| `addressPrefix` | `string` | `RizonConstants.RizonBech32PrefixAccAddr` | prefix to use to derive the address from the public key (ex: rizon) |

#### Returns

`Promise`<[`RizonWallet`](RizonWallet.md)\>
