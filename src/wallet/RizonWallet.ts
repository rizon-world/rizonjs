import { SignMode } from '../codec/cosmos/tx/signing/v1beta1/signing';
import { RizonTypes } from '..';

export abstract class RizonWallet {
    protected publicKey?: Uint8Array;
    protected address?: string;

    /**
     * Gets the current wallet address
     * @see {@link RizonWallet.useAccount}
     *
     * @returns wallet address (Bech32)
     */
    getAddress = (): string => {
        if (!this.address) {
            throw new Error('No account selected.');
        }
        return this.address;
    };

    /**
     * Gets the current wallet public key
     * @see {@link RizonWallet.useAccount}
     *
     * @returns wallet public key (secp256k1)
     */
    getPublicKey = (): Uint8Array => {
        if (!this.publicKey) {
            throw new Error('No account selected.');
        }
        return this.publicKey;
    };

    /**
     * Gets the wallet signin mode
     */
    abstract signingMode(): SignMode;

    /**
     * Whether or not the wallet support changing account
     * Basically only wallet initialized using a private key should not be able to do so
     * @see {@link RizonWallet.useAccount}
     */
    abstract canChangeAccount(): boolean;

    /**
     * Change the wallet to use
     *
     * @param hdPath BIP44 HD Path
     * @param addressPrefix prefix to use (ex: rizon)
     */
    abstract useAccount(hdPath: string, addressPrefix: string): Promise<boolean>;

    /**
     * Sign a raw payload.
     * This method might not be available for all types of wallets such as Ledger.
     *
     * @param data the payload to sign directly
     */
    abstract sign(data: Uint8Array): Promise<Uint8Array>;

    /**
     * Sign a transaction document using a RizonWallet
     *
     * @param doc document to sign
     */
    abstract signTransaction(doc: RizonTypes.Doc): Promise<[RizonTypes.SignDoc, Uint8Array]>;

    /**
     * Sign a message using a RizonWallet
     * Provided for signature generation and verification as signature will depend on the wallet payload implementation
     *
     * @param msg message to sign
     */
    abstract signMessage(msg: string): Promise<RizonTypes.SignMsg>;
}
