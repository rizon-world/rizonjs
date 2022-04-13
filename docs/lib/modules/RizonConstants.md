# Namespace: RizonConstants

## Table of contents

### Enumerations

- [RizonMessageSigner](../enums/RizonConstants.RizonMessageSigner.md)

### Variables

- [HDPath](RizonConstants.md#hdpath)
- [MicroRizonDenom](RizonConstants.md#microrizondenom)
- [PrivateKeyLength](RizonConstants.md#privatekeylength)
- [RizonBech32PrefixAccAddr](RizonConstants.md#rizonbech32prefixaccaddr)
- [RizonBech32PrefixAccPub](RizonConstants.md#rizonbech32prefixaccpub)
- [RizonBech32PrefixConsAddr](RizonConstants.md#rizonbech32prefixconsaddr)
- [RizonBech32PrefixConsPub](RizonConstants.md#rizonbech32prefixconspub)
- [RizonBech32PrefixValAddr](RizonConstants.md#rizonbech32prefixvaladdr)
- [RizonBech32PrefixValPub](RizonConstants.md#rizonbech32prefixvalpub)
- [RizonDenom](RizonConstants.md#rizondenom)
- [RizonExponent](RizonConstants.md#rizonexponent)
- [RizonSignOnlyChainId](RizonConstants.md#rizonsignonlychainid)
- [RizonWalletSigningVersion](RizonConstants.md#rizonwalletsigningversion)

### Functions

- [getRizonHdPath](RizonConstants.md#getrizonhdpath)

## Variables

### HDPath

• **HDPath**: ``"m/44'/118'/0'/"``

Network HDPath

**`see`** https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

**`see`** https://github.com/satoshilabs/slips/blob/master/slip-0044.md

___

### MicroRizonDenom

• **MicroRizonDenom**: ``"uatolo"``

Micro Coin denomination

___

### PrivateKeyLength

• **PrivateKeyLength**: ``32``

Private Key length

___

### RizonBech32PrefixAccAddr

• **RizonBech32PrefixAccAddr**: ``"rizon"``

Network Bech32 prefix of an account's address

___

### RizonBech32PrefixAccPub

• **RizonBech32PrefixAccPub**: ``"rizonpub"``

Network Bech32 prefix of an account's public key

___

### RizonBech32PrefixConsAddr

• **RizonBech32PrefixConsAddr**: ``"rizonvalcons"``

Network Bech32 prefix of a consensus node address

___

### RizonBech32PrefixConsPub

• **RizonBech32PrefixConsPub**: ``"rizonvalconspub"``

Network Bech32 prefix of a consensus node public key

___

### RizonBech32PrefixValAddr

• **RizonBech32PrefixValAddr**: ``"rizonvaloper"``

Network Bech32 prefix of a validator's operator address

___

### RizonBech32PrefixValPub

• **RizonBech32PrefixValPub**: ``"rizonvaloperpub"``

Network Bech32 prefix of a validator's operator public key

___

### RizonDenom

• **RizonDenom**: ``"atolo"``

Coin denomination

___

### RizonExponent

• **RizonExponent**: ``6``

RIZON Exponent
1 atolo = 10^6 uatolo

___

### RizonSignOnlyChainId

• **RizonSignOnlyChainId**: ``"titan-1"``

Chain ID used for message signature by wallet implementations that require one

___

### RizonWalletSigningVersion

• **RizonWalletSigningVersion**: ``"1"``

Signing version of the SDK

## Functions

### getRizonHdPath

▸ `Const` **getRizonHdPath**(`accountIndex?`, `walletIndex?`): `string`

Get a Network HDPath for a specified account index

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `accountIndex` | `number` | `0` | appended at the end of the default derivation path |
| `walletIndex` | `number` | `0` | - |

#### Returns

`string`
