import { Message } from '../Message';
import { Coin } from '../../types';
import { MsgDelegate } from '../../codec/cosmos/staking/v1beta1/tx';

export const MsgDelegateUrl = '/cosmos.staking.v1beta1.MsgDelegate';

export const BuildMsgDelegate = (delegatorAddress: string, validatorAddress: string, amount?: Coin): Message => {
    return {
        typeUrl: MsgDelegateUrl,
        value: {
            delegatorAddress,
            validatorAddress,
            amount,
        } as MsgDelegate,
    };
};
