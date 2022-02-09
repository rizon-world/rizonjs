import { Secp256k1, Secp256k1Signature } from '@cosmjs/crypto';
import { fromBase64, sha256 } from './encoding';

export const verifySignature = async (signature: string, signDocBytes: Uint8Array, publicKey: Uint8Array): Promise<boolean> => {
    const valid = await Secp256k1.verifySignature(Secp256k1Signature.fromFixedLength(fromBase64(signature)), sha256(signDocBytes), publicKey);
    return valid;
};
