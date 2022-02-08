import * as cryp from 'crypto-browserify';
import * as hexEncoding from 'crypto-js/enc-hex';
import SHA3 from 'crypto-js/sha3';
import * as uuid from 'uuid';
import { Secp256k1, sha256, ripemd160, EnglishMnemonic, Bip39, Slip10, Slip10Curve, stringToPath } from '@cosmjs/crypto';
import { Bech32, toHex, fromHex } from '@cosmjs/encoding';

import * as constants from './constants';

/**
 * KeyStore storage format (web3 secret storage format)
 */
export interface KeyStore {
    version: number;
    id: string;
    crypto: {
        ciphertext: string;
        cipherparams: {
            iv: string;
        };
        cipher: string;
        kdf: string;
        kdfparams: {
            dklen: number;
            salt: string;
            c: number;
            prf: string;
        };
        /** Must use sha3 according to web3 secret storage spec. */
        mac: string;
    };
}

export const keyToHex = (key: Uint8Array, xPrefix = false): string => {
    const hexKey = toHex(key);
    if (xPrefix) {
        return hexKey;
    }
    return hexKey;
};

export const keyFromHex = (hexKey: string): Uint8Array => {
    if (hexKey.startsWith('0x')) {
        return fromHex(hexKey.substr(2));
    }
    return fromHex(hexKey);
};

export const getRizonHdPath = (accountIndex = 0): string => {
    return constants.HDPath + accountIndex.toString();
};

export const getAddressFromPublicKey = (publicKey: Uint8Array, prefix = constants.RizonAddressPrefix) => {
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

export const getPrivateKeyFromMnemonic = async (mnemonic: string, hdPath = getRizonHdPath(0)): Promise<Uint8Array> => {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    // TODO: add support for more languages
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked);
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, stringToPath(hdPath));
    return privkey;
};

const sha3 = (hex: string): string => {
    const hexEncoded = hexEncoding.parse(hex);
    return SHA3(hexEncoded).toString();
};

export const getPrivateKeyFromKeystore = (keystore: string | KeyStore, password: string): Uint8Array => {
    const store: KeyStore = typeof keystore === 'string' ? JSON.parse(keystore) : keystore;
    if (store.crypto.kdfparams.prf !== 'hmac-sha256') {
        throw new Error('Unsupported parameters to PBKDF2');
    }

    const derivedKey = cryp.pbkdf2Sync(Buffer.from(password), Buffer.from(store.crypto.kdfparams.salt, 'hex'), store.crypto.kdfparams.c, store.crypto.kdfparams.dklen, 'sha256');
    const ciphertext = Buffer.from(store.crypto.ciphertext, 'hex');
    const bufferValue = Buffer.concat([derivedKey.slice(16, 32), ciphertext]);

    // try sha3 (new / ethereum keystore) mac first
    const mac = sha3(bufferValue.toString('hex'));
    if (mac !== store.crypto.mac) {
        // the legacy (sha256) mac is next to be checked. pre-testnet keystores used a sha256 digest for the mac.
        // the sha256 mac was not compatible with ethereum keystores, so it was changed to sha3 for mainnet.
        const macLegacy = sha256(bufferValue);
        if (toHex(macLegacy) !== store.crypto.mac) {
            throw new Error('Keystore mac check failed (sha3 & sha256) - wrong password?');
        }
    }

    const decipher = cryp.createDecipheriv(store.crypto.cipher, derivedKey.slice(0, 32), Buffer.from(store.crypto.cipherparams.iv, 'hex'));
    return new Uint8Array(Buffer.concat([decipher.update(ciphertext), decipher.final()]));
};

export const generateKeyStore = (privateKey: Uint8Array, password: string): KeyStore => {
    const salt = cryp.randomBytes(32);
    const iv = cryp.randomBytes(16);
    const cipherAlg = 'aes-256-ctr';

    const privateKeyHex = keyToHex(privateKey);

    const kdf = 'pbkdf2';
    const kdfparams = {
        dklen: 32,
        salt: salt.toString('hex'),
        c: 262144,
        prf: 'hmac-sha256',
    };

    const derivedKey = cryp.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
    const cipher = cryp.createCipheriv(cipherAlg, derivedKey.slice(0, 32), iv);
    if (!cipher) {
        throw new Error('Unsupported cipher');
    }

    const ciphertext = Buffer.concat([cipher.update(Buffer.from(privateKeyHex, 'hex')), cipher.final()]);
    const bufferValue = Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext.toString('hex'), 'hex')]);

    return {
        version: 1,
        id: uuid.v4({
            random: cryp.randomBytes(16),
        }),
        crypto: {
            ciphertext: ciphertext.toString('hex'),
            cipherparams: {
                iv: iv.toString('hex'),
            },
            cipher: cipherAlg,
            kdf,
            kdfparams: kdfparams,
            // mac must use sha3 according to web3 secret storage spec
            mac: sha3(bufferValue.toString('hex')),
        },
    };
};

/**
 * Generates a random private key
 */
export const generatePrivateKey = (): string => {
    throw new Error('Not implemented');
};

/**
 * Generates a random mnemonic
 */
export const generateMnemonic = (): string => {
    throw new Error('Not implemented');
};
