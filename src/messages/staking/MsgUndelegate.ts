import { Message } from '../Message';
import { Coin } from '../../types';
import { MsgUndelegate } from '../../codec/cosmos/staking/v1beta1/tx';

export const MsgUndelegateUrl = '/cosmos.staking.v1beta1.MsgUndelegate';

export const BuildMsgUndelegate = (delegatorAddress: string, validatorAddress: string, amount?: Coin): Message => {
    return {
        typeUrl: MsgUndelegateUrl,
        value: {
            delegatorAddress,
            validatorAddress,
            amount,
        } as MsgUndelegate,
    };
};
