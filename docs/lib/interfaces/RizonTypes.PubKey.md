# Interface: PubKey

[RizonTypes](../modules/RizonTypes.md).PubKey

PubKey defines a secp256k1 public key
Key is the compressed form of the pubkey. The first byte depends is a 0x02 byte
if the y-coordinate is the lexicographically largest of the two associated with
the x-coordinate. Otherwise the first byte is a 0x03.
This prefix is followed with the x-coordinate.

## Table of contents

### Properties

- [key](RizonTypes.PubKey.md#key)

## Properties

### key

• **key**: `Uint8Array`
