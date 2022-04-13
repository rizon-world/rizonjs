# Interface: Doc

[RizonTypes](../modules/RizonTypes.md).Doc

## Table of contents

### Properties

- [chainId](RizonTypes.Doc.md#chainid)
- [fee](RizonTypes.Doc.md#fee)
- [memo](RizonTypes.Doc.md#memo)
- [messages](RizonTypes.Doc.md#messages)
- [signers](RizonTypes.Doc.md#signers)

## Properties

### chainId

• **chainId**: `string`

chain_id is the unique identifier of the chain this transaction targets.
It prevents signed transactions from being used on another chain by an
attacker

___

### fee

• **fee**: [`Fee`](RizonTypes.Fee.md)

Transaction requested Fee

___

### memo

• `Optional` **memo**: `string`

Transaction memo

___

### messages

• **messages**: [`Message`](RizonMessages.Message.md)[]

Transactions messages

___

### signers

• **signers**: [`DocSigner`](RizonTypes.DocSigner.md)[]

Transction auth signers
