/**
 * RIZON address prefix
 */
export const RizonAddressPrefix = 'rizon';

/**
 * RIZON HDPath
 */
export const HDPath = "m/44'/118'/0'/0/";

export const getRizonHdPath = (accountIndex = 0): string => {
    return HDPath + accountIndex.toString();
};
