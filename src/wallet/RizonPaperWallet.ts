import { SignMode } from '../codec/cosmos/tx/signing/v1beta1/signing';
import { RizonUtils, RizonConstants, RizonTypes } from '..';
import { RizonWallet } from '.';

export class RizonPaperWallet extends RizonWallet {
    private readonly mnemonic?: string;
    private privateKey?: Uint8Array;

    /**
     * Create a RizonPaperWallet instance based on a mnemonic or a private key
     * This constructor is not intended to be used directly as it does not initialize the underlying key pair
     * Better use the provided static RizonPaperWallet builders
     *
     * @param mnemonicOrPrivateKey mnemonic (string) used to derive the private key or private key (Uint8Array)
     */
    constructor(mnemonicOrPrivateKey: string | Uint8Array) {
        super();
        if (RizonUtils.isUint8Array(mnemonicOrPrivateKey)) {
            this.privateKey = mnemonicOrPrivateKey;
        } else {
            this.mnemonic = mnemonicOrPrivateKey;
        }
    }

    signingMode = (): SignMode => {
        return SignMode.SIGN_MODE_DIRECT;
    };

    canChangeAccount = (): boolean => {
        return !!this.mnemonic;
    };

    useAccount = async (hdPath = RizonConstants.getRizonHdPath(0, 0), addressPrefix = RizonConstants.RizonBech32PrefixAccAddr): Promise<boolean> => {
        if (this.mnemonic) {
            this.privateKey = await RizonUtils.getPrivateKeyFromMnemonic(this.mnemonic, hdPath);
            this.publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
            this.address = RizonUtils.getAddressFromPublicKey(this.publicKey, addressPrefix);
            return true;
        } else if (this.privateKey) {
            this.publicKey = await RizonUtils.getPublicKeyFromPrivateKey(this.privateKey);
            this.address = RizonUtils.getAddressFromPublicKey(this.publicKey, addressPrefix);
            return false;
        }
        throw new Error('No available mnemonic or private key.');
    };

    sign = async (data: Uint8Array): Promise<Uint8Array> => {
        if (!this.privateKey || !this.publicKey) {
            throw new Error('No account selected.');
        }
        const signature = await RizonUtils.generateSignature(data, this.privateKey);
        return signature;
    };

    signTransaction = async (doc: RizonTypes.Doc): Promise<[RizonTypes.SignDoc, Uint8Array]> => {
        if (!this.privateKey || !this.publicKey) {
            throw new Error('No account selected.');
        }
        const signerIndex = RizonUtils.uint8IndexOf(
            doc.signers.map((signer) => signer.publicKey),
            this.publicKey as Uint8Array,
        );
        if (signerIndex === -1) {
            throw new Error('Signer not found in document');
        }
        const signDoc = RizonUtils.generateSignDoc(doc, signerIndex, this.signingMode());
        const signBytes = RizonUtils.generateSignDocBytes(signDoc);
        const hashedMessage = RizonUtils.sha256(signBytes);
        const signature = await RizonUtils.generateSignature(hashedMessage, this.privateKey);
        return [signDoc, signature];
    };

    signMessage = async (msg: string): Promise<RizonTypes.SignMsg> => {
        if (!this.privateKey || !this.publicKey) {
            throw new Error('No account selected.');
        }
        const signature = await RizonUtils.generateSignature(RizonUtils.sha256(RizonUtils.toAscii(msg)), this.privateKey);
        return {
            address: this.getAddress(),
            publicKey: this.getPublicKey(),
            msg: msg,
            sig: signature,
            version: RizonConstants.RizonWalletSigningVersion,
            signer: RizonConstants.RizonMessageSigner.PAPER,
        };
    };
}
