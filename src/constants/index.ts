/**
 * RIZON Exponent
 * 1 atolo = 10^6 uatolo
 */
export const RizonExponent = 6;

/**
 * Coin denomination
 */
export const RizonDenom = 'atolo';

/**
 * Micro Coin denomination
 */
export const MicroRizonDenom = 'uatolo';

/**
 * Network Bech32 prefix of an account's address
 */
export const RizonBech32PrefixAccAddr = 'rizon';

/**
 * Network Bech32 prefix of an account's public key
 */
export const RizonBech32PrefixAccPub = 'rizonpub';

/**
 * Network Bech32 prefix of a validator's operator address
 */
export const RizonBech32PrefixValAddr = 'rizonvaloper';

/**
 * Network Bech32 prefix of a validator's operator public key
 */
export const RizonBech32PrefixValPub = 'rizonvaloperpub';

/**
 * Network Bech32 prefix of a consensus node address
 */
export const RizonBech32PrefixConsAddr = 'rizonvalcons';

/**
 * Network Bech32 prefix of a consensus node public key
 */
export const RizonBech32PrefixConsPub = 'rizonvalconspub';

/**
 * Network HDPath
 *
 * @see https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 * @see https://github.com/satoshilabs/slips/blob/master/slip-0044.md
 */
export const HDPath = "m/44'/118'/0'/";

/**
 * Get a Network HDPath for a specified account index
 *
 * @param accountIndex appended at the end of the default derivation path
 */
export const getRizonHdPath = (accountIndex = 0, walletIndex = 0): string => {
    return HDPath + accountIndex.toString() + '/' + walletIndex.toString();
};

/**
 * Private Key length
 */
export const PrivateKeyLength = 32;

/**
 * Signing version of the SDK
 */
export const RizonWalletSigningVersion = '1';

/**
 * Signing wallets
 */
export enum RizonMessageSigner {
    PAPER = 'rizon-sdk/paper',
    LEDGER = 'rizon-sdk/ledger',
    OFFLINE = 'rizon-sdk/offline',
}

/**
 * Chain ID used for message signature by wallet implementations that require one
 */
export const RizonSignOnlyChainId = 'titan-1';
