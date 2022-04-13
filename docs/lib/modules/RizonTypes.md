# Namespace: RizonTypes

## Table of contents

### Interfaces

- [Account](../interfaces/RizonTypes.Account.md)
- [Coin](../interfaces/RizonTypes.Coin.md)
- [Commission](../interfaces/RizonTypes.Commission.md)
- [CommissionRates](../interfaces/RizonTypes.CommissionRates.md)
- [Description](../interfaces/RizonTypes.Description.md)
- [Doc](../interfaces/RizonTypes.Doc.md)
- [DocSigner](../interfaces/RizonTypes.DocSigner.md)
- [Fee](../interfaces/RizonTypes.Fee.md)
- [Log](../interfaces/RizonTypes.Log.md)
- [LogAttribute](../interfaces/RizonTypes.LogAttribute.md)
- [LogEvent](../interfaces/RizonTypes.LogEvent.md)
- [PubKey](../interfaces/RizonTypes.PubKey.md)
- [SignDoc](../interfaces/RizonTypes.SignDoc.md)
- [SignMsg](../interfaces/RizonTypes.SignMsg.md)
- [Tx](../interfaces/RizonTypes.Tx.md)

### Variables

- [PubKey](RizonTypes.md#pubkey)
- [Tx](RizonTypes.md#tx)

## Variables

### PubKey

• **PubKey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `decode` | (`input`: `Uint8Array` \| `Reader`, `length?`: `number`) => [`PubKey`](RizonTypes.md#pubkey) |
| `encode` | (`message`: [`PubKey`](RizonTypes.md#pubkey), `writer`: `Writer`) => `Writer` |
| `fromJSON` | (`object`: `any`) => [`PubKey`](RizonTypes.md#pubkey) |
| `fromPartial` | (`object`: { `key?`: `Uint8Array`  }) => [`PubKey`](RizonTypes.md#pubkey) |
| `toJSON` | (`message`: [`PubKey`](RizonTypes.md#pubkey)) => `unknown` |

___

### Tx

• **Tx**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `decode` | (`input`: `Uint8Array` \| `Reader`, `length?`: `number`) => [`Tx`](RizonTypes.md#tx) |
| `encode` | (`message`: [`Tx`](RizonTypes.md#tx), `writer`: `Writer`) => `Writer` |
| `fromJSON` | (`object`: `any`) => [`Tx`](RizonTypes.md#tx) |
| `fromPartial` | (`object`: { `authInfo?`: { signerInfos?: { publicKey?: { typeUrl?: string \| undefined; value?: Uint8Array \| undefined; } \| undefined; modeInfo?: { single?: { mode?: SignMode \| undefined; } \| undefined; multi?: { ...; } \| undefined; } \| undefined; sequence?: Long \| undefined; }[] \| undefined; fee?: { ...; } \| undefined; } ; `body?`: { messages?: { typeUrl?: string \| undefined; value?: Uint8Array \| undefined; }[] \| undefined; memo?: string \| undefined; timeoutHeight?: Long \| undefined; extensionOptions?: { ...; }[] \| undefined; nonCriticalExtensionOptions?: { ...; }[] \| undefined; } ; `signatures?`: `Uint8Array`[]  }) => [`Tx`](RizonTypes.md#tx) |
| `toJSON` | (`message`: [`Tx`](RizonTypes.md#tx)) => `unknown` |
