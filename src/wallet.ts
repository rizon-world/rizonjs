import * as utils from './utils';
import * as constants from './constants';

export class RizonWallet {
    public readonly privateKey: Uint8Array;
    public readonly publicKey: Uint8Array;
    public readonly address: string;

    constructor(privateKey: Uint8Array, publicKey: Uint8Array, addressPrefix = constants.RizonAddressPrefix) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.address = utils.getAddressFromPublicKey(publicKey, addressPrefix);
    }

    static fromPrivateKey = async (privateKey: Uint8Array, addressPrefix = constants.RizonAddressPrefix) => {
        const publicKey = await utils.getPublicKeyFromPrivateKey(privateKey);
        return new RizonWallet(privateKey, publicKey, addressPrefix);
    };

    static fromMnemonic = async (mnemonic: string, hdPath = utils.getRizonHdPath(0), addressPrefix = constants.RizonAddressPrefix) => {
        const privateKey = await utils.getPrivateKeyFromMnemonic(mnemonic, hdPath);
        return RizonWallet.fromPrivateKey(privateKey, addressPrefix);
    };

    static fromKeyStore = async (keystore: string | utils.KeyStore, password: string, addressPrefix = constants.RizonAddressPrefix) => {
        const privateKey = utils.getPrivateKeyFromKeystore(keystore, password);
        return RizonWallet.fromPrivateKey(privateKey, addressPrefix);
    };
}
