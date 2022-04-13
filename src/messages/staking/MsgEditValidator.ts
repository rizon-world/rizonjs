import { Message } from '../Message';
import { Description } from '../../types';
import { MsgEditValidator } from '../../codec/cosmos/staking/v1beta1/tx';

export const MsgEditValidatorUrl = '/cosmos.staking.v1beta1.MsgEditValidator';

export const BuildMsgEditValidator = (validatorAddress: string, commissionRate: string, minSelfDelegation: string, description?: Description): Message => {
    return {
        typeUrl: MsgEditValidatorUrl,
        value: {
            validatorAddress,
            commissionRate,
            minSelfDelegation,
            description,
        } as MsgEditValidator,
    };
};
