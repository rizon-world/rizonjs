import axios from 'axios';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
import { RizonWalletFactory, RizonMessages, RizonUtils, RizonConstants, RizonWallet } from '../src';

import { RizonClient } from '../src';
import { requestCoinsFromFaucet } from './utils';

const requestCoinsIfNeeded = async (clt: RizonClient, w: RizonWallet, microLumMinAmount?: number) => {
    const balance = await clt.getBalance(w.getAddress(), RizonConstants.MicroRizonDenom);
    if (balance && parseInt(balance.amount) > microLumMinAmount) {
        return;
    }
    await requestCoinsFromFaucet(clt, w.getAddress());
};

describe('Ledger', () => {
    let clt: RizonClient;

    beforeAll(async () => {
        clt = await RizonClient.connect('http://node0.testnet.lum.network/rpc');
    });

    afterAll(async () => {
        clt.disconnect();
    });

    // Remove the .skip part of the function to run the ledger tests manually
    it.skip('Cosmos App Manual signature must work', async () => {
        // Manual testing using ledger device
        // Ledger device must be unlocked and Cosmos app opened prior to running those tests
        const transport = await TransportNodeHid.create();
        const w = await RizonWalletFactory.fromLedgerTransport(transport, `m/44'/118'/0'/0/0`, 'lum');
        expect(w).toBeTruthy();

        await requestCoinsIfNeeded(clt, w, 1000);

        const acc = await clt.getAccount(w.getAddress());
        expect(acc).toBeTruthy();

        const balance = await clt.getBalance(acc.address, RizonConstants.MicroRizonDenom);
        expect(parseInt(balance.amount)).toBeGreaterThan(0);

        const chainId = await clt.getChainId();
        const doc = {
            accountNumber: acc.accountNumber,
            chainId,
            fee: {
                amount: [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }],
                gas: '100000',
            },
            memo: 'Send LUM using Ledger App',
            messages: [RizonMessages.BuildMsgSend(w.getAddress(), 'lum1lsagfzrm4gz28he4wunt63sts5xzmczwjttsr9', [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])],
            signers: [
                {
                    accountNumber: acc.accountNumber,
                    sequence: acc.sequence,
                    publicKey: w.getPublicKey(),
                },
            ],
        };
        const res = await clt.signAndBroadcastTx(w, doc);
        expect(RizonUtils.broadcastTxCommitSuccess(res)).toBeTruthy();
    });

    // Remove the .skip part of the function to run the ledger tests manually
    it.skip('Cosmos App Signature verification should work', async () => {
        // Manual testing using ledger device
        // Ledger device must be unlocked and Cosmos app opened prior to running those tests
        const message = 'Lum network is an awesome decentralized protocol';
        const transport = await TransportNodeHid.create();
        const w1 = await RizonWalletFactory.fromLedgerTransport(transport, `m/44'/118'/0'/0/0`, 'lum');
        const w2 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());
        const signed = await w1.signMessage(message);
        const v1 = await RizonUtils.verifySignMsg(signed);
        expect(v1).toBeTruthy();
        const v2 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { msg: 'Wrong message input' }));
        expect(v2).toBeFalsy();
        const v3 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { publicKey: w2.getPublicKey() }));
        expect(v3).toBeFalsy();
        const v4 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { address: w2.getAddress() }));
        expect(v4).toBeFalsy();
    });

    // Remove the .skip part of the function to run the ledger tests manually
    it.skip('Lum App Manual signature must work', async () => {
        // Manual testing using ledger device
        // Ledger device must be unlocked and Lum app opened prior to running those tests
        const transport = await TransportNodeHid.create();
        const w = await RizonWalletFactory.fromLedgerTransport(transport, `m/44'/880'/0'/0/0`, 'lum');
        expect(w).toBeTruthy();

        await requestCoinsIfNeeded(clt, w, 1000);

        const acc = await clt.getAccount(w.getAddress());
        expect(acc).toBeTruthy();

        const balance = await clt.getBalance(acc.address, RizonConstants.MicroRizonDenom);
        expect(parseInt(balance.amount)).toBeGreaterThan(0);

        const chainId = await clt.getChainId();
        const doc = {
            accountNumber: acc.accountNumber,
            chainId,
            fee: {
                amount: [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }],
                gas: '100000',
            },
            memo: 'Send LUM using Ledger App',
            messages: [RizonMessages.BuildMsgSend(w.getAddress(), 'lum1lsagfzrm4gz28he4wunt63sts5xzmczwjttsr9', [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])],
            signers: [
                {
                    accountNumber: acc.accountNumber,
                    sequence: acc.sequence,
                    publicKey: w.getPublicKey(),
                },
            ],
        };
        const res = await clt.signAndBroadcastTx(w, doc);
        expect(RizonUtils.broadcastTxCommitSuccess(res)).toBeTruthy();
    });

    // Remove the .skip part of the function to run the ledger tests manually
    it.skip('Lum App Signature verification should work', async () => {
        // Manual testing using ledger device
        // Ledger device must be unlocked and Lum app opened prior to running those tests
        const message = 'Lum network is an awesome decentralized protocol';
        const transport = await TransportNodeHid.create();
        const w1 = await RizonWalletFactory.fromLedgerTransport(transport, `m/44'/880'/0'/0/0`, 'lum');
        const w2 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());
        const signed = await w1.signMessage(message);
        const v1 = await RizonUtils.verifySignMsg(signed);
        expect(v1).toBeTruthy();
        const v2 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { msg: 'Wrong message input' }));
        expect(v2).toBeFalsy();
        const v3 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { publicKey: w2.getPublicKey() }));
        expect(v3).toBeFalsy();
        const v4 = await RizonUtils.verifySignMsg(Object.assign({}, signed, { address: w2.getAddress() }));
        expect(v4).toBeFalsy();
    });
});
