# Rizon  

In this docs, these are supporting message types in Rizon(groot-14).

### Supporting Message Types

- [cosmos-sdk/MsgSend](#msgsend)
- [cosmos-sdk/MsgMultiSend](#msgmultisend)
- [cosmos-sdk/MsgCreateValidator](#msgcreatevalidator)
- [cosmos-sdk/MsgEditValidator](#msgeditvalidator)
- [cosmos-sdk/MsgDelegate](#msgdelegate)
- [cosmos-sdk/MsgUndelegate](#msgundelegate)
- [cosmos-sdk/MsgBeginRedelegate](#msgbeginredelegate)
- [cosmos-sdk/MsgWithdrawDelegationReward](#msgwithdrawdelegationreward)
- [cosmos-sdk/MsgWithdrawValidatorCommission](#msgwithdrawvalidatorcommission)
- [cosmos-sdk/MsgModifyWithdrawAddress](#msgmodifywithdrawaddress)
- [cosmos-sdk/MsgSubmitProposal](#msgsubmitproposal)
- [cosmos-sdk/MsgDeposit](#msgdeposit)
- [cosmos-sdk/MsgVote](#msgvote)
- [cosmos-sdk/MsgUnjail](#msgunjail)

### MsgSend

```js
// cosmos-sdk/MsgSend
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSend",
			value: {
				amount: [
					{
						amount: String(100000), 	// 6 decimal places (1000000 uatolo = 1 ATOLO)
						denom: "uatolo"
					}
				],
				from_address: address,
				to_address: "rizon1xjdla8awqz8kw74sakdh969t7mm4ypwdwnj435"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgMultiSend

```js
// cosmos-sdk/MsgMultiSend
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgMultiSend",
			value: {
				inputs: [
					{
						address: address,
						coins: [
							{
								amount: String(100000),		// 6 decimal places (1000000 uatolo = 1 ATOLO)
								denom: "uatolo"
							}
						]
					}
				],
				outputs: [
					{
						address: "rizon1xjdla8awqz8kw74sakdh969t7mm4ypwdwnj435",
						coins: [
							{
								amount: String(100000),
								denom: "uatolo"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgCreateValidator

```js
// cosmos-sdk/MsgCreateValidator
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgCreateValidator",
			value: {
				description: {
					moniker: "Test Validator",
					identity: "",
					website: "",
					details: ""
				},
				commission: {
					rate: "0.250000000000000000",	// 25.0%
					max_rate: "1.000000000000000000",
					max_change_rate: "0.100000000000000000"
				},
				min_self_delegation: String(1),
				delegator_address: address,
				validator_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z",
				pubkey: "rizonvalconspub1zcjduepq8ve2hfuvnyhan9tz7vjgstslw7lygnk85sgp3emehtnxjpu3j7gqw5wvcz",	// $(rizond tendermint show-validator)
				value: {
					denom: "uatolo",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgEditValidator

```js
// cosmos-sdk/MsgEditValidator
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgEditValidator",
			value: {
				Description: {
					moniker: "Best Validator",
					identity: "[do-not-modify]",
					website: "[do-not-modify]",
					details: "[do-not-modify]"
				},
				address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgDelegate

```js
// cosmos-sdk/MsgDelegate
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatolo"
				},
				delegator_address: address,
				validator_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgUndelegate

```js
// cosmos-sdk/MsgUndelegate
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUndelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatolo"
				},
				delegator_address: address,
				validator_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgBeginRedelegate 

```js
// cosmos-sdk/MsgBeginRedelegate
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgBeginRedelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatolo"
				},
				delegator_address: address,
				validator_dst_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z",
				validator_src_address: "rizonvaloper1r4tgu5k48c2anehp3u9gjqda89mu39tl8lzqh8"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgWithdrawDelegationReward

```js
// cosmos-sdk/MsgWithdrawDelegationReward
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawDelegationReward",
			value: {
				delegator_address: address,
				validator_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgWithdrawValidatorCommission

```js
// cosmos-sdk/MsgWithdrawValidatorCommission
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawValidatorCommission",
			value: {
				validator_address: "rizonvaloper13a4asd0tvekw6r2cga36k5j82rfwhdlaku0y8z"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgModifyWithdrawAddress

```js
// cosmos-sdk/MsgModifyWithdrawAddress
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgModifyWithdrawAddress",
			value: {
				delegator_address: address,
				withdraw_address: "rizon1kw5wvf56yehq9s0fq2aul2smvk4g4mxyu0kzy8"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgSubmitProposal

```js
// cosmos-sdk/MsgSubmitProposal
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSubmitProposal",
			value: {
				title: "Activate the Community Pool",
				description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
				initial_deposit: [
                    {
                    	amount: String(1000000),
                        denom: "uatolo"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgDeposit

```js
// cosmos-sdk/MsgDeposit
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDeposit",
			value: {
				amount: [
                    {
                    	amount: String(1000000),
                        denom: "uatolo"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgVote

```js
// cosmos-sdk/MsgVote
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgVote",
			value: {
				option: "Yes",	// Yes, No, NowithVeto, Abstain
				proposal_id: String(1),
                voter: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```

### MsgUnjail

```js
// cosmos-sdk/MsgUnjail
let stdSignMsg = rizon.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUnjail",
			value: {
				address: "rizonvaloper1kw5wvf56yehq9s0fq2aul2smvk4g4mxy0t5rxh"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatolo" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```
