import * as hexEncoding from 'crypto-js/enc-hex';
import SHA3 from 'crypto-js/sha3';
import { Bech32, toHex, fromHex, toBase64, fromBase64 } from '@cosmjs/encoding';
import { sha256 } from '@cosmjs/crypto';

const sha3 = (hex: string): string => {
    const hexEncoded = hexEncoding.parse(hex);
    return SHA3(hexEncoded).toString();
};

const keyToHex = (key: Uint8Array, xPrefix = false): string => {
    const hexKey = toHex(key);
    if (xPrefix) {
        return '0x' + hexKey;
    }
    return hexKey;
};

const keyFromHex = (hexKey: string): Uint8Array => {
    if (hexKey.startsWith('0x')) {
        return fromHex(hexKey.substr(2));
    }
    return fromHex(hexKey);
};

export { Bech32, toHex, fromHex, toBase64, fromBase64, sha256, sha3, keyToHex, keyFromHex };
