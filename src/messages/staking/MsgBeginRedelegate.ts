import { Message } from '../Message';
import { Coin } from '../../types';
import { MsgBeginRedelegate } from '../../codec/cosmos/staking/v1beta1/tx';

export const MsgBeginRedelegateUrl = '/cosmos.staking.v1beta1.MsgBeginRedelegate';

export const BuildMsgBeginRedelegate = (delegatorAddress: string, validatorSrcAddress: string, validatorDstAddress: string, amount?: Coin): Message => {
    return {
        typeUrl: MsgBeginRedelegateUrl,
        value: {
            delegatorAddress,
            validatorSrcAddress,
            validatorDstAddress,
            amount,
        } as MsgBeginRedelegate,
    };
};
