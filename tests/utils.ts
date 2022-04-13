import axios from 'axios';

import { RizonClient, RizonConstants } from '../src';

export const requestCoinsFromFaucet = async (clt: RizonClient, addr: string): Promise<void> => {
    const uatoloAmount = 1 * Math.pow(10, RizonConstants.RizonExponent);

    // Try to query the local faucet
    let res = null;
    try {
        res = await axios.post(
            `http://localhost:5000/faucets`,
            { 'address': addr, 'coins': [`${uatoloAmount}uatolo`] },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    } catch (e) {
    }

    if (!res || res.status !== 200) {
        // Otherwise query the testnet official faucet
        res = await axios.get(`http://localhost:5000/faucet/${addr}`);
    }
    expect(res).toBeTruthy();
    expect(res.status).toEqual(200);

    const faucetResult = new Promise((resolve, reject) => {
        let it = 0;
        const rec = setInterval(async () => {
            const balance = await clt.getBalance(addr, RizonConstants.MicroRizonDenom);
            if (balance && parseInt(balance.amount) >= uatoloAmount) {
                clearInterval(rec);
                resolve(true);
            } else if (it >= 60) {
                clearInterval(rec);
                reject();
            }
            it++;
        }, 1000);
    });
    await expect(faucetResult).resolves.toBeTruthy();
};
