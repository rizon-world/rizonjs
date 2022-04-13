import { RizonWallet, RizonWalletFactory, RizonClient, RizonUtils, RizonConstants, RizonRegistry, RizonTypes, RizonMessages } from '../src';
import { requestCoinsFromFaucet } from './utils';

const randomString = (): string => {
    return Math.random().toString(36).substring(7);
};

describe('RizonClient', () => {
    let clt: RizonClient;
    let w1: RizonWallet;
    let w2: RizonWallet;

    beforeAll(async () => {
        clt = await RizonClient.connect('https://rpcapi.testnet.rizon.world');

        // Prepare the wallets
        w1 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());
        w2 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());

        expect(w1.getAddress()).not.toEqual(w2.getAddress());

        // Seed them with faucet coins each
        await requestCoinsFromFaucet(clt, w1.getAddress());
        await requestCoinsFromFaucet(clt, w2.getAddress());
    });

    afterAll(async () => {
        clt.disconnect();
    });

    it('should allow to connect via webshockets', async () => {
        const wsClt = await RizonClient.connect('wss://node0.testnet.lum.network/rpc');
        expect(await wsClt.status()).toBeTruthy();
        wsClt.disconnect();
    });

    it('should be able to simulate transactions', async () => {
        const w3 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());
        
        // Should reject invalid bech32 addresses
        // await expect(
        //     clt.queryClient.tx.simulate([RizonMessages.BuildMsgSend(w1.getAddress(), 'toto', [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])], 'hello', w1.getPublicKey(), 0),
        // ).rejects.toThrow();

        // // Should reject invalid signer
        // await expect(
        //     clt.queryClient.tx.simulate([RizonMessages.BuildMsgSend(w3.getAddress(), w3.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])], 'hello', w3.getPublicKey(), 0),
        // ).rejects.toThrow();

        // // // Should reject invalid amounts
        // await expect(
        //     clt.queryClient.tx.simulate([RizonMessages.BuildMsgSend(w1.getAddress(), w1.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '-1' }])], 'hello', w3.getPublicKey(), 0),
        // ).rejects.toThrow();

        // // // Should reject invalid sequences
        // await expect(
        //     clt.queryClient.tx.simulate([RizonMessages.BuildMsgSend(w1.getAddress(), w1.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])], 'hello', w3.getPublicKey(), -1),
        // ).rejects.toThrow();

        // Should return simulation in case of success
        const res = await clt.queryClient.tx.simulate(
            [RizonMessages.BuildMsgSend(w1.getAddress(), w1.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])],
            'hello',
            w3.getPublicKey(),
            0,
        );
        //expect(res).toBeTruthy();
        // expect(res.gasInfo).toBeTruthy();
        // expect(res.result).toBeTruthy();
    });

    it('Should expose basic information', async () => {
        const height = (await clt.getBlockHeight()) - 1;
        expect(clt.getChainId()).resolves.toEqual('groot-16');
        expect(height).toBeGreaterThan(0);
        expect(clt.getBlock(height)).resolves.toBeTruthy();
    });

    it('should expose tendermint rpcs', async () => {
        const height = (await clt.getBlockHeight()) - 1;
        expect(height).toBeGreaterThan(0);
        expect(clt.tmClient.health()).resolves.toBeNull();
        expect(clt.tmClient.status()).resolves.toBeTruthy();
        expect(clt.tmClient.genesis()).resolves.toBeTruthy();
        expect(clt.tmClient.abciInfo()).resolves.toBeTruthy();
        expect(clt.tmClient.block(height)).resolves.toBeTruthy();
        expect(clt.tmClient.blockResults(height)).resolves.toBeTruthy();
        expect(clt.tmClient.blockchain(0, height)).resolves.toBeTruthy();
        expect(clt.tmClient.validatorsAll(height)).resolves.toBeTruthy();
    });

    it('Should expose bank module', async () => {
        const supplies = await clt.queryClient.bank.totalSupply();
        expect(supplies).toBeTruthy();
        expect(supplies.length).toBeGreaterThan(0);
        const rizonSupply = supplies.filter((c) => c.denom === RizonConstants.MicroRizonDenom)[0];
        expect(rizonSupply).toBeTruthy();
        expect(parseFloat(rizonSupply.amount)).toBeGreaterThan(0);
    });

    it('Should expose staking module', async () => {
        const validators = await clt.tmClient.validatorsAll();
        expect(validators.validators.length).toBeGreaterThanOrEqual(1);
        const block = await clt.getBlock();
        let found = false;
        for (let v = 0; v < validators.validators.length; v++) {
            const val = validators.validators[v];
            if (RizonUtils.toHex(val.address) === RizonUtils.toHex(block.block.header.proposerAddress)) {
                found = true;
                break;
            }
        }
        expect(found).toBeTruthy();

        // Get first available block
        const firstBlock = await clt.getBlock(2);

        // Get boot val (genesis) with address genesis proposer address
        const bootVal = validators.validators.filter((v) => RizonUtils.toHex(v.address) === RizonUtils.toHex(firstBlock.block.header.proposerAddress))[0];
        expect(bootVal).toBeTruthy();

        // Get staking validator by matching it using pubkeys
        const stakers = await clt.queryClient.staking.validators('BOND_STATUS_BONDED');
        const bootStak = stakers.validators.filter((s) => RizonUtils.toHex((RizonRegistry.decode(s.consensusPubkey) as RizonTypes.PubKey).key) === RizonUtils.toHex(bootVal.pubkey.data))[0];
        expect(bootVal).toBeTruthy();

        // Get account information by deriving the address from the operator address
        const delegAddress = RizonUtils.Bech32.encode(RizonConstants.RizonBech32PrefixAccAddr, RizonUtils.Bech32.decode(bootStak.operatorAddress).data);
        const account = await clt.getAccount(delegAddress);
        expect(account).toBeTruthy();

        // Get account balances
        const balances = await clt.getAllBalances(account.address);
        expect(balances).toBeTruthy();
        expect(balances.length).toBeGreaterThan(0);
        const rizonBalance = balances.filter((b) => b.denom === RizonConstants.MicroRizonDenom)[0];
        expect(rizonBalance).toBeTruthy();
        expect(parseFloat(rizonBalance.amount)).toBeGreaterThan(0);
    });

    it('Should expose distribution module', async () => {
        // Get validators
        const validators = await clt.tmClient.validatorsAll();
        expect(validators.validators.length).toBeGreaterThanOrEqual(1);

        // Get first available block
        const firstBlock = await clt.getBlock(2);

        // Get boot val (genesis) with address genesis proposer address
        const bootVal = validators.validators.filter((v) => RizonUtils.toHex(v.address) === RizonUtils.toHex(firstBlock.block.header.proposerAddress))[0];
        expect(bootVal).toBeTruthy();

        // Get genesis validator account address
        const stakers = await clt.queryClient.staking.validators('BOND_STATUS_BONDED');
        const bootStak = stakers.validators.filter((s) => RizonUtils.toHex((RizonRegistry.decode(s.consensusPubkey) as RizonTypes.PubKey).key) === RizonUtils.toHex(bootVal.pubkey.data))[0];
        expect(bootVal).toBeTruthy();

        // Get account information by deriving the address from the operator address
        const delegAddress = RizonUtils.Bech32.encode(RizonConstants.RizonBech32PrefixAccAddr, RizonUtils.Bech32.decode(bootStak.operatorAddress).data);
        const account = await clt.getAccount(delegAddress);
        expect(account).toBeTruthy();

        const deleg = await clt.queryClient.distribution.delegatorWithdrawAddress(account.address);
        expect(deleg).toBeTruthy();
        expect(deleg.withdrawAddress).toEqual(account.address);
        const delegValidators = await clt.queryClient.distribution.delegatorValidators(account.address);
        expect(delegValidators).toBeTruthy();
        expect(delegValidators.validators.length).toBeGreaterThan(0);
    });

    it('Should expose the mint module', async () => {
        const supply = await clt.getAllSupplies();

        const params = await clt.queryClient.mint.params();
        expect(params).toBeTruthy();
        expect(params.inflationMin).toBeTruthy();
        expect(params.inflationMax).toBeTruthy();
        expect(params.inflationRateChange).toBeTruthy();
        expect(params.mintDenom).toBeTruthy();
        expect(params.blocksPerYear).toBeTruthy();
        expect(params.goalBonded).toBeTruthy();

        const inflation = await clt.queryClient.mint.inflation();
        expect(parseInt(inflation)).toBeGreaterThan(0);

        const annualProvisions = await clt.queryClient.mint.annualProvisions();
        expect(parseInt(annualProvisions)).toBeGreaterThan(0);
    });

    it('Should allow multiple signers per transaction', async () => {
        const acc1 = await clt.getAccount(w1.getAddress());
        const acc2 = await clt.getAccount(w2.getAddress());
        const chainId = await clt.getChainId();
        const fee = {
            amount: [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }],
            gas: '300000',
        };

        const doc = {
            accountNumber: 0, //acc1.accountNumber,
            chainId,
            fee: fee,
            memo: 'Just a open beam transaction',
            messages: [
                RizonMessages.BuildMsgSend(w1.getAddress(), w2.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '99' }]),
                RizonMessages.BuildMsgSend(w2.getAddress(), w1.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '99' }]),
            ],
            signers: [
                {
                    accountNumber: acc1.accountNumber,
                    sequence: acc1.sequence,
                    publicKey: w1.getPublicKey(),
                },
                {
                    accountNumber: acc2.accountNumber,
                    sequence: acc2.sequence,
                    publicKey: w2.getPublicKey(),
                },
            ],
        };

        const res = await clt.signAndBroadcastTx([w1, w2], doc);
        expect(RizonUtils.broadcastTxCommitSuccess(res));
    });
});
