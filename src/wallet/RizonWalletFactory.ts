import Transport from '@ledgerhq/hw-transport';
import { OfflineSigner } from '@cosmjs/proto-signing';

import { RizonWallet } from './RizonWallet';
import { RizonLedgerWallet } from './RizonedgerWallet';
import { RizonPaperWallet } from './RizonPaperWallet';
import { RizonOfflineSignerWallet } from './RizonOfflineSignerWallet';
import { RizonConstants, RizonUtils } from '..';

export class RizonWalletFactory {
    /**
     * Create a RizonWallet instance based on a private key (secp256k1)
     *
     * @param privateKey wallet private key (secp256k1)
     * @param addressPrefix prefix to use to derive the address from the public key (ex: rizon)
     */
    static fromPrivateKey = async (privateKey: Uint8Array, addressPrefix = RizonConstants.RizonBech32PrefixAccAddr): Promise<RizonWallet> => {
        const wallet = new RizonPaperWallet(privateKey);
        await wallet.useAccount(RizonConstants.getRizonHdPath(0, 0), addressPrefix);
        return wallet;
    };

    /**
     * Create a RizonWallet instance based on a mnemonic and a derivation path
     *
     * @param mnemonic mnemonic used to derive the private key
     * @param hdPath BIP44 derivation path
     * @param addressPrefix prefix to use to derive the address from the public key (ex: rizon)
     */
    static fromMnemonic = async (mnemonic: string, hdPath = RizonConstants.getRizonHdPath(0, 0), addressPrefix = RizonConstants.RizonBech32PrefixAccAddr): Promise<RizonWallet> => {
        const wallet = new RizonPaperWallet(mnemonic);
        await wallet.useAccount(hdPath, addressPrefix);
        return wallet;
    };

    /**
     * Create a RizonWallet instance based on a keystore
     *
     * @param keystore keystore used to decypher the private key
     * @param password keystore password
     * @param addressPrefix prefix to use to derive the address from the public key (ex: rizon)
     */
    static fromKeyStore = async (keystore: string | RizonUtils.KeyStore, password: string, addressPrefix = RizonConstants.RizonBech32PrefixAccAddr): Promise<RizonWallet> => {
        const privateKey = RizonUtils.getPrivateKeyFromKeystore(keystore, password);
        const wallet = new RizonPaperWallet(privateKey);
        await wallet.useAccount(RizonConstants.getRizonHdPath(0, 0), addressPrefix);
        return wallet;
    };

    /**
     * Create a RizonWallet instance based on an OfflineDirectSigner instance compatible with Comsjs based implementations.
     *
     * @param offlineSigner OfflineDirectSigner instance compatible with Comsjs based implementations
     */
    static fromOfflineSigner = async (offlineSigner: OfflineSigner): Promise<RizonWallet> => {
        const wallet = new RizonOfflineSignerWallet(offlineSigner);
        await wallet.useAccount();
        return wallet;
    };

    /**
     * Create a RizonWallet instance based on a ledger transport
     *
     * @param transport Ledger transport to use (https://github.com/LedgerHQ/ledgerjs)
     * @param hdPath BIP44 derivation path
     * @param addressPrefix prefix to use to derive the address from the public key (ex: rizon)
     */
    static fromLedgerTransport = async (transport: Transport, hdPath = RizonConstants.getRizonHdPath(0, 0), addressPrefix = RizonConstants.RizonBech32PrefixAccAddr): Promise<RizonWallet> => {
        const wallet = new RizonLedgerWallet(transport);
        await wallet.useAccount(hdPath, addressPrefix);
        return wallet;
    };
}
