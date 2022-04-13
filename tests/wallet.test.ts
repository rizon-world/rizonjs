import { AccountData, DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';

import { SignDoc } from '../src/codec/cosmos/tx/v1beta1/tx';
import { RizonWallet, RizonWalletFactory, RizonUtils, RizonConstants, RizonMessages, RizonRegistry, RizonAminoRegistry } from '../src';
import { AminoSignResponse, encodeSecp256k1Signature, OfflineAminoSigner, StdSignDoc } from '@cosmjs/amino';
import { SignMode } from '../src/codec/cosmos/tx/signing/v1beta1/signing';

class FakeOfflineDirectSigner implements OfflineDirectSigner {
    private readonly privateKey: Uint8Array;

    constructor(privateKey: Uint8Array) {
        this.privateKey = privateKey;
    }

    getAccounts = async (): Promise<AccountData[]> => {
        const publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
        return [
            {
                pubkey: publicKey,
                address: RizonUtils.getAddressFromPublicKey(publicKey),
                algo: 'secp256k1',
            },
        ];
    };

    signDirect = async (signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> => {
        const publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
        const signBytes = RizonUtils.generateSignDocBytes(signDoc);
        const hashedMessage = RizonUtils.sha256(signBytes);
        const signature = await RizonUtils.generateSignature(hashedMessage, this.privateKey);
        const stdSig = encodeSecp256k1Signature(publicKey, signature);
        return {
            signed: signDoc,
            signature: stdSig,
        };
    };
}

class FakeOfflineAminoSigner implements OfflineAminoSigner {
    private readonly privateKey: Uint8Array;

    constructor(privateKey: Uint8Array) {
        this.privateKey = privateKey;
    }

    getAccounts = async (): Promise<AccountData[]> => {
        const publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
        return [
            {
                pubkey: publicKey,
                address: RizonUtils.getAddressFromPublicKey(publicKey),
                algo: 'secp256k1',
            },
        ];
    };

    signAmino = async (signerAddress: string, stdSignDoc: StdSignDoc): Promise<AminoSignResponse> => {
        const publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
        const signDoc = RizonUtils.generateSignDoc(
            {
                chainId: stdSignDoc.chain_id,
                fee: stdSignDoc.fee,
                memo: stdSignDoc.memo,
                messages: stdSignDoc.msgs.map((aminoMsg) => RizonAminoRegistry.fromAmino(aminoMsg)),
                signers: [{ accountNumber: parseInt(stdSignDoc.account_number), sequence: parseInt(stdSignDoc.sequence), publicKey: publicKey }],
            },
            0,
            SignMode.SIGN_MODE_DIRECT, // Simulated to enable signature comparison during tests
        );
        const signBytes = RizonUtils.generateSignDocBytes(signDoc);
        const hashedMessage = RizonUtils.sha256(signBytes);
        const signature = await RizonUtils.generateSignature(hashedMessage, this.privateKey);
        const stdSig = encodeSecp256k1Signature(publicKey, signature);
        return {
            signed: stdSignDoc,
            signature: stdSig,
        };
    };
}

describe('RizonWallet', () => {
    it('Should be identical from mnemonic, privatekey and keystore recovery', async () => {
        const mnemonic = 'surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put';
        const privateKey = '0xb8e62c34928025cdd3aef6cbebc68694b5ad9209b2aff6d3891c8e61d22d3a3b';
        const keystore =
            '{"version":1,"id":"f901e6d1-021a-4ac9-b0bb-494101ac52fa","crypto":{"ciphertext":"be5d10547f3c145f08f0a9f5fbb9051ae0175c78a8865c607253460b4cbe002d","cipherparams":{"iv":"9aa1ac8e7eb398e7d13b93e91dcaa191"},"cipher":"aes-256-ctr","kdf":"pbkdf2","kdfparams":{"dklen":32,"salt":"b3eff47ff6d30ff70320bb90187b5c5948104cbda89cdae9daf7ea6d4cacbea3","c":262144,"prf":"hmac-sha256"},"mac":"7b6ce598043d65cff9c78c7fd8fd3d659b845dee56c48daef6bca4accc0e0c5cfaea79a801c4a0dfd86480cd6e792010843923fb7a498dd883c14cd2495f9920"}}';

        const w1 = await RizonWalletFactory.fromMnemonic(mnemonic, `m/44'/837'/0'/0/0`);
        const w2 = await RizonWalletFactory.fromPrivateKey(RizonUtils.keyFromHex(privateKey));
        const w3 = await RizonWalletFactory.fromKeyStore(keystore, 'lumiere');
        const w4 = await RizonWalletFactory.fromOfflineSigner(new FakeOfflineDirectSigner(RizonUtils.keyFromHex(privateKey)));
        const w5 = await RizonWalletFactory.fromOfflineSigner(new FakeOfflineAminoSigner(RizonUtils.keyFromHex(privateKey)));

        expect(RizonUtils.isAddressValid(w1.getAddress())).toBe(true);
        expect(RizonUtils.isAddressValid(w1.getAddress(), RizonConstants.RizonBech32PrefixAccAddr)).toBe(true);
        expect(RizonUtils.isAddressValid(w1.getAddress(), undefined)).toBe(true);
        expect(RizonUtils.isAddressValid(w1.getAddress(), 'cosmos')).toBe(false);

        // Create a fake document for signature verification purposes
        const doc = {
            accountNumber: 1,
            chainId: 'groot-16',
            fee: {
                amount: [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }],
                gas: '1',
            },
            memo: 'Not a real transaction',
            messages: [RizonMessages.BuildMsgSend(w1.getAddress(), w2.getAddress(), [{ denom: RizonConstants.MicroRizonDenom, amount: '1' }])],
            signers: [
                {
                    accountNumber: 1,
                    sequence: 1,
                    publicKey: w1.getPublicKey(),
                },
            ],
        };

        const w1Response = await w1.signTransaction(doc);
        expect(RizonUtils.verifySignature(w1Response[1], RizonUtils.sha256(RizonUtils.generateSignDocBytes(w1Response[0])), w5.getPublicKey()));

        expect(w1.getAddress()).toEqual(w2.getAddress());
        expect(w1.getPublicKey()).toEqual(w2.getPublicKey());
        expect(w1Response).toEqual(await w2.signTransaction(doc));

        expect(w1.getAddress()).toEqual(w3.getAddress());
        expect(w1.getPublicKey()).toEqual(w3.getPublicKey());
        expect(w1Response).toEqual(await w3.signTransaction(doc));

        expect(w1.getAddress()).toEqual(w4.getAddress());
        expect(w1.getPublicKey()).toEqual(w4.getPublicKey());
        expect(w1Response).toEqual(await w4.signTransaction(doc));

        expect(w1.getAddress()).toEqual(w5.getAddress());
        expect(w1.getPublicKey()).toEqual(w5.getPublicKey());
        // Signature will differ due to the SignMode use but should still be valid
        const w5Response = await w5.signTransaction(doc);
        expect(w1Response).not.toEqual(w5Response);
        expect(RizonUtils.verifySignature(w5Response[1], RizonUtils.sha256(RizonUtils.generateSignDocBytes(w5Response[0])), w5.getPublicKey()));

        const randomPrivateKey = RizonUtils.generatePrivateKey();
        expect(randomPrivateKey).toHaveLength(RizonConstants.PrivateKeyLength);
        expect(RizonWalletFactory.fromPrivateKey(randomPrivateKey)).resolves.toBeInstanceOf(RizonWallet);

        expect(RizonUtils.generateMnemonic(12).split(' ')).toHaveLength(12);
        expect(RizonUtils.generateMnemonic(24).split(' ')).toHaveLength(24);
        expect(RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic(12))).resolves.toBeInstanceOf(RizonWallet);
        expect(RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic(24))).resolves.toBeInstanceOf(RizonWallet);
    });

    it('Should be able to sign and verify messages', async () => {
        const message = 'Hello Rizon World';

        const privateKey = '0xb8e62c34928025cdd3aef6cbebc68694b5ad9209b2aff6d3891c8e61d22d3a3b';
        const mnemonic = 'surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put';

        const w1 = await RizonWalletFactory.fromMnemonic(mnemonic);
        const w2 = await RizonWalletFactory.fromMnemonic(RizonUtils.generateMnemonic());
        const w3 = await RizonWalletFactory.fromOfflineSigner(new FakeOfflineDirectSigner(RizonUtils.keyFromHex(privateKey)));

        const signedW1 = await w1.signMessage(message);
        expect(signedW1.signer).toEqual(RizonConstants.RizonMessageSigner.PAPER);
        expect(signedW1.version).toEqual(RizonConstants.RizonWalletSigningVersion);
        expect(await RizonUtils.verifySignMsg(signedW1)).toBeTruthy();
        expect(await RizonUtils.verifySignMsg(Object.assign({}, signedW1, { msg: 'Wrong message input' }))).toBeFalsy();
        expect(await RizonUtils.verifySignMsg(Object.assign({}, signedW1, { publicKey: w2.getPublicKey() }))).toBeFalsy();
        expect(await RizonUtils.verifySignMsg(Object.assign({}, signedW1, { address: w2.getAddress() }))).toBeFalsy();

        const signedW2 = await w2.signMessage(message);
        expect(signedW2.signer).toEqual(RizonConstants.RizonMessageSigner.PAPER);
        expect(signedW2.version).toEqual(RizonConstants.RizonWalletSigningVersion);
        expect(RizonUtils.toHex(signedW2.sig)).not.toEqual(RizonUtils.toHex(signedW1.sig));
        expect(await RizonUtils.verifySignMsg(signedW2)).toBeTruthy();

        const signedW3 = await w3.signMessage(message);
        expect(signedW3.signer).toEqual(RizonConstants.RizonMessageSigner.OFFLINE);
        expect(signedW3.version).toEqual(RizonConstants.RizonWalletSigningVersion);
        expect(await RizonUtils.verifySignMsg(signedW3)).toBeTruthy();
    });
});
