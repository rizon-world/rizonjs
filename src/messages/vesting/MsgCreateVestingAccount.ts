import { Message } from '../Message';
import { MsgCreateVestingAccount } from '../../codec/cosmos/vesting/v1beta1/tx';
import { Coin } from '../../types';
import Long from 'long';

export const MsgCreateVestingAccountUrl = '/cosmos.vesting.v1beta1.MsgCreateVestingAccount';

export const BuildMsgCreateVestingAccount = (fromAddress: string, toAddress: string, amount: Coin[], endTime: Long, delayed: boolean): Message => {
    return {
        typeUrl: MsgCreateVestingAccountUrl,
        value: {
            fromAddress,
            toAddress,
            amount,
            endTime,
            delayed,
        } as MsgCreateVestingAccount,
    };
};
