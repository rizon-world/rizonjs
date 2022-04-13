# Interface: SignDoc

[RizonTypes](../modules/RizonTypes.md).SignDoc

## Table of contents

### Properties

- [accountNumber](RizonTypes.SignDoc.md#accountnumber)
- [authInfoBytes](RizonTypes.SignDoc.md#authinfobytes)
- [bodyBytes](RizonTypes.SignDoc.md#bodybytes)
- [chainId](RizonTypes.SignDoc.md#chainid)

## Properties

### accountNumber

• **accountNumber**: `Long`

account_number is the account number of the account in state

___

### authInfoBytes

• **authInfoBytes**: `Uint8Array`

auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
representation in TxRaw.

___

### bodyBytes

• **bodyBytes**: `Uint8Array`

body_bytes is protobuf serialization of a TxBody that matches the
representation in TxRaw.

___

### chainId

• **chainId**: `string`

chain_id is the unique identifier of the chain this transaction targets.
It prevents signed transactions from being used on another chain by an
attacker
