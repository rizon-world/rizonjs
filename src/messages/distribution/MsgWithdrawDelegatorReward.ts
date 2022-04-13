import { Message } from '../Message';
import { MsgWithdrawDelegatorReward } from '../../codec/cosmos/distribution/v1beta1/tx';

export const MsgWithdrawDelegatorRewardUrl = '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward';

export const BuildMsgWithdrawDelegatorReward = (delegatorAddress: string, validatorAddress: string): Message => {
    return {
        typeUrl: MsgWithdrawDelegatorRewardUrl,
        value: {
            delegatorAddress,
            validatorAddress,
        } as MsgWithdrawDelegatorReward,
    };
};
