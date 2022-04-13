# Class: RizonClient

## Table of contents

### Constructors

- [constructor](RizonClient.md#constructor)

### Properties

- [chainId](RizonClient.md#chainid)
- [queryClient](RizonClient.md#queryclient)
- [tmClient](RizonClient.md#tmclient)

### Methods

- [broadcastTx](RizonClient.md#broadcasttx)
- [disconnect](RizonClient.md#disconnect)
- [getAccount](RizonClient.md#getaccount)
- [getAllBalances](RizonClient.md#getallbalances)
- [getAllSupplies](RizonClient.md#getallsupplies)
- [getBalance](RizonClient.md#getbalance)
- [getBlock](RizonClient.md#getblock)
- [getBlockHeight](RizonClient.md#getblockheight)
- [getChainId](RizonClient.md#getchainid)
- [getSupply](RizonClient.md#getsupply)
- [getTx](RizonClient.md#gettx)
- [searchTx](RizonClient.md#searchtx)
- [signAndBroadcastTx](RizonClient.md#signandbroadcasttx)
- [signTx](RizonClient.md#signtx)
- [status](RizonClient.md#status)
- [txsQuery](RizonClient.md#txsquery)
- [connect](RizonClient.md#connect)

## Constructors

### constructor

• **new RizonClient**(`tmClient`)

Create a RizonClient instance using a tendermint RPC client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tmClient` | `Tendermint34Client` | tendermint RPC client |

## Properties

### chainId

• `Private` `Optional` **chainId**: `string`

___

### queryClient

• `Readonly` **queryClient**: `QueryClient` & `AuthExtension` & `AuthzExtension` & `BankExtension` & `DistributionExtension` & `GovExtension` & `IbcExtension` & `MintExtension` & `StakingExtension` & `SlashingExtension` & `FeegrantExtension` & `TxExtension`

___

### tmClient

• `Readonly` **tmClient**: `Tendermint34Client`

## Methods

### broadcastTx

▸ **broadcastTx**(`tx`): `Promise`<`BroadcastTxCommitResponse`\>

Broadcast a signed transaction
Basic usage would be to use the signTx method prior to calling this method

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `Uint8Array` | signed transaction to broadcast |

#### Returns

`Promise`<`BroadcastTxCommitResponse`\>

___

### disconnect

▸ **disconnect**(): `void`

Disconnect the underlying tendermint client

#### Returns

`void`

___

### getAccount

▸ **getAccount**(`address`): `Promise`<``null`` \| [`Account`](../interfaces/RizonTypes.Account.md)\>

Get account information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | wallet address |

#### Returns

`Promise`<``null`` \| [`Account`](../interfaces/RizonTypes.Account.md)\>

___

### getAllBalances

▸ **getAllBalances**(`address`): `Promise`<[`Coin`](../interfaces/RizonTypes.Coin.md)[]\>

Get all account balances

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | wallet address |

#### Returns

`Promise`<[`Coin`](../interfaces/RizonTypes.Coin.md)[]\>

___

### getAllSupplies

▸ **getAllSupplies**(): `Promise`<[`Coin`](../interfaces/RizonTypes.Coin.md)[]\>

Get all coins supplies

#### Returns

`Promise`<[`Coin`](../interfaces/RizonTypes.Coin.md)[]\>

___

### getBalance

▸ **getBalance**(`address`, `searchDenom`): `Promise`<``null`` \| [`Coin`](../interfaces/RizonTypes.Coin.md)\>

Get account balance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | wallet address |
| `searchDenom` | `string` | Coin denomination (ex: rizon) |

#### Returns

`Promise`<``null`` \| [`Coin`](../interfaces/RizonTypes.Coin.md)\>

___

### getBlock

▸ **getBlock**(`height?`): `Promise`<`BlockResponse`\>

Get a block by height

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `height?` | `number` | block height to get (default to current height) |

#### Returns

`Promise`<`BlockResponse`\>

___

### getBlockHeight

▸ **getBlockHeight**(): `Promise`<`number`\>

Get the current block height

#### Returns

`Promise`<`number`\>

___

### getChainId

▸ **getChainId**(): `Promise`<`string`\>

Get the chain id

#### Returns

`Promise`<`string`\>

___

### getSupply

▸ **getSupply**(`searchDenom`): `Promise`<``null`` \| [`Coin`](../interfaces/RizonTypes.Coin.md)\>

Get coin supply

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchDenom` | `string` | Coin denomination (ex: rizon) |

#### Returns

`Promise`<``null`` \| [`Coin`](../interfaces/RizonTypes.Coin.md)\>

___

### getTx

▸ **getTx**(`hash`, `includeProof?`): `Promise`<``null`` \| `TxResponse`\>

Get a transaction by Hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `Uint8Array` | transaction hash to retrieve |
| `includeProof?` | `boolean` | whether or not to include proof of the transaction inclusion in the block |

#### Returns

`Promise`<``null`` \| `TxResponse`\>

___

### searchTx

▸ **searchTx**(`queries`, `page?`, `perPage?`, `includeProof?`): `Promise`<`TxResponse`[]\>

Search for transactions (paginated)
All queries will be run and results will be deduplicated, merged and sorted by block height

Queries:
To tell which events you want, you need to provide a query. query is a string, which has a form: "condition AND condition ..." (no OR at the moment). condition has a form: "key operation operand". key is a string with a restricted set of possible symbols ( \t\n\r\()"'=>< are not allowed). operation can be "=", "<", "<=", ">", ">=", "CONTAINS" AND "EXISTS". operand can be a string (escaped with single quotes), number, date or time.
Examples: tm.event = 'NewBlock' # new blocks tm.event = 'CompleteProposal' # node got a complete proposal tm.event = 'Tx' AND tx.hash = 'XYZ' # single transaction tm.event = 'Tx' AND tx.height = 5 # all txs of the fifth block tx.height = 5 # all txs of the fifth block
Tendermint provides a few predefined keys: tm.event, tx.hash and tx.height. Note for transactions, you can define additional keys by providing events with DeliverTx response.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `queries` | `string`[] | `undefined` | queries to run (see utils/search for helpers) |
| `page` | `number` | `1` | page to query (default to 1) |
| `perPage` | `number` | `30` | results per pages (default to 30) |
| `includeProof?` | `boolean` | `undefined` | whether or not to include proofs of the transactions inclusion in the block |

#### Returns

`Promise`<`TxResponse`[]\>

___

### signAndBroadcastTx

▸ **signAndBroadcastTx**(`wallet`, `doc`): `Promise`<`BroadcastTxCommitResponse`\>

Signs and broadcast the transaction using the specified wallet and messages

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wallet` | [`RizonWallet`](RizonWallet.md) \| [`RizonWallet`](RizonWallet.md)[] | signing wallet or wallets for multi signature |
| `doc` | [`Doc`](../interfaces/RizonTypes.Doc.md) | document to sign and broadcast as a transaction |

#### Returns

`Promise`<`BroadcastTxCommitResponse`\>

___

### signTx

▸ **signTx**(`wallet`, `doc`): `Promise`<`Uint8Array`\>

Signs the messages using the provided wallet and builds the transaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wallet` | [`RizonWallet`](RizonWallet.md) \| [`RizonWallet`](RizonWallet.md)[] | signing wallet or wallets for multi signature |
| `doc` | [`Doc`](../interfaces/RizonTypes.Doc.md) | document to sign |

#### Returns

`Promise`<`Uint8Array`\>

___

### status

▸ **status**(): `Promise`<`StatusResponse`\>

Get the connected node status information

#### Returns

`Promise`<`StatusResponse`\>

___

### txsQuery

▸ `Private` **txsQuery**(`params`): `Promise`<readonly `TxResponse`[]\>

Run a tx search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `TxSearchParams` | Search params |

#### Returns

`Promise`<readonly `TxResponse`[]\>

___

### connect

▸ `Static` **connect**(`endpoint`): `Promise`<[`RizonClient`](RizonClient.md)\>

Creates a new RizonClient for the given endpoint
Uses HTTP when the URL schema is http or https, uses WebSockets otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `endpoint` | `string` | Blockchain node RPC url |

#### Returns

`Promise`<[`RizonClient`](RizonClient.md)\>
