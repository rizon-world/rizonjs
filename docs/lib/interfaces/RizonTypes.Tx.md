# Interface: Tx

[RizonTypes](../modules/RizonTypes.md).Tx

Tx is the standard type used for broadcasting transactions.

## Table of contents

### Properties

- [authInfo](RizonTypes.Tx.md#authinfo)
- [body](RizonTypes.Tx.md#body)
- [signatures](RizonTypes.Tx.md#signatures)

## Properties

### authInfo

• `Optional` **authInfo**: `AuthInfo`

auth_info is the authorization related content of the transaction,
specifically signers, signer modes and fee

___

### body

• `Optional` **body**: `TxBody`

body is the processable content of the transaction

___

### signatures

• **signatures**: `Uint8Array`[]

signatures is a list of signatures that matches the length and order of
AuthInfo's signer_infos to allow connecting signature meta information like
public key and signing mode by position.
