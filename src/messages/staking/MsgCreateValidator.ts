import { Message } from '../Message';
import { Coin, Description, CommissionRates } from '../../types';
import { Any } from '../../codec/google/protobuf/any';
import { MsgCreateValidator } from '../../codec/cosmos/staking/v1beta1/tx';

export const MsgCreateValidatorUrl = '/cosmos.staking.v1beta1.MsgCreateValidator';

export const BuildMsgCreateValidator = (
    validatorAddress: string,
    delegatorAddress: string,
    minSelfDelegation: string,
    commission?: CommissionRates,
    description?: Description,
    value?: Coin,
    pubkey?: Any,
): Message => {
    return {
        typeUrl: MsgCreateValidatorUrl,
        value: {
            description,
            commission,
            minSelfDelegation,
            delegatorAddress,
            validatorAddress,
            pubkey,
            value,
        } as MsgCreateValidator,
    };
};
