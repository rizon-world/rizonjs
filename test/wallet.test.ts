import { RizonWallet, RizonUtils } from '../src';
// import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

describe('RizonWallet', () => {
    it('Should be identical from mnemonic, privatekey and keystore recovery', async () => {
        
        const mnemonic = 'surround miss nominee dream gap cross assault thank captain prosper drop duty group candy wealth weather scale put';
        const privateKey = '0x69b4e47d3aa61ad6184493529cd0feb0d2dfb55ea31aa9799af42607de3cd1a9';
        const keystore =
            '{"version":1,"id":"ba1f0a24-eba1-4a9d-90c3-71f1b5edd0ab","crypto":{"ciphertext":"03817f0ee2eb6a15f18adedfe6c49ba0578407a8fe8a6ae2e6fedb4c5b5f5bb4","cipherparams":{"iv":"50bbbc449e311de12ccc5aabe1128ca5"},"cipher":"aes-256-ctr","kdf":"pbkdf2","kdfparams":{"dklen":32,"salt":"6e74c2ace96b3551b640db5c7330c60ca0e256fb1573d3c434f4576c96489d9d","c":262144,"prf":"hmac-sha256"},"mac":"518d51435267a37cd636b89fcfee824e2ffb7f196782b665fc5b433b07c0e4f16a3326dc04548269beff37291fbb5e7845a21044a7632356d771a4d0a3a92b8d"}}';

        const w_from_mnemonic = await RizonWallet.fromMnemonic(mnemonic);
        const w_from_privatekey = await RizonWallet.fromPrivateKey(RizonUtils.keyFromHex(privateKey));
        const w_from_keystore = await RizonWallet.fromKeyStore(keystore, 'rizonwallet');

        expect(w_from_mnemonic).toEqual(w_from_privatekey);
        expect(w_from_mnemonic).toEqual(w_from_keystore);
        expect(w_from_privatekey).toEqual(w_from_keystore);
    });
});
