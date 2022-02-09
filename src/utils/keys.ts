import { Secp256k1, sha256, ripemd160, EnglishMnemonic, Bip39, Slip10, Slip10Curve, stringToPath, Random } from '@cosmjs/crypto';

import { Bech32 } from './encoding';
import { RizonAddressPrefix, getRizonHdPath, PrivateKeyLength, DecodedAddressLength } from '../constants';

export const getAddressFromPublicKey = (publicKey: Uint8Array, prefix = RizonAddressPrefix) => {
    if (publicKey.length !== 33) {
        throw new Error(`Invalid Secp256k1 pubkey length (compressed): ${publicKey.length}`);
    }
    const hash1 = sha256(publicKey);
    const hash2 = ripemd160(hash1);
    return Bech32.encode(prefix, hash2);
};

export const getPublicKeyFromPrivateKey = async (privateKey: Uint8Array): Promise<Uint8Array> => {
    const { pubkey } = await Secp256k1.makeKeypair(privateKey);
    return Secp256k1.compressPubkey(pubkey);
};

export const getPrivateKeyFromSeed = (seed: Uint8Array, hdPath = getRizonHdPath(0)): Uint8Array => {
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, stringToPath(hdPath));
    return privkey;
};

export const getSeedFromMnemonic = async (mnemonic: string): Promise<Uint8Array> => {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    // TODO: add support for more languages
    return Bip39.mnemonicToSeed(mnemonicChecked);
};

export const getPrivateKeyFromMnemonic = async (mnemonic: string, hdPath = getRizonHdPath(0)): Promise<Uint8Array> => {
    const seed = await getSeedFromMnemonic(mnemonic);
    return getPrivateKeyFromSeed(seed, hdPath);
};

/**
 * Generates a random private key
 */
export const generatePrivateKey = (): Uint8Array => {
    return Random.getBytes(PrivateKeyLength);
};

export const isAddressValid = (address: string, prefix: string | undefined = RizonAddressPrefix): boolean => {
    try {
        const decoded = Bech32.decode(address);
        return (!prefix || prefix === decoded.prefix) && decoded.data.length === DecodedAddressLength;
    } catch (err) {
        return false;
    }
};
