# Interface: KeyStore

[RizonUtils](../modules/RizonUtils.md).KeyStore

KeyStore storage format (web3 secret storage format)

## Table of contents

### Properties

- [crypto](RizonUtils.KeyStore.md#crypto)
- [id](RizonUtils.KeyStore.md#id)
- [version](RizonUtils.KeyStore.md#version)

## Properties

### crypto

• **crypto**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cipher` | `string` | - |
| `cipherparams` | `Object` | - |
| `cipherparams.iv` | `string` | - |
| `ciphertext` | `string` | - |
| `kdf` | `string` | - |
| `kdfparams` | `Object` | - |
| `kdfparams.c` | `number` | - |
| `kdfparams.dklen` | `number` | - |
| `kdfparams.prf` | `string` | - |
| `kdfparams.salt` | `string` | - |
| `mac` | `string` | Must use sha3 according to web3 secret storage spec. |

___

### id

• **id**: `string`

___

### version

• **version**: `number`
