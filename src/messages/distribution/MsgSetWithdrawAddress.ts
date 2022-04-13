import { Message } from '../Message';
import { MsgSetWithdrawAddress } from '../../codec/cosmos/distribution/v1beta1/tx';

export const MsgSetWithdrawAddressUrl = '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress';

export const BuildMsgSetWithdrawAddress = (delegatorAddress: string, withdrawAddress: string): Message => {
    return {
        typeUrl: MsgSetWithdrawAddressUrl,
        value: {
            delegatorAddress,
            withdrawAddress,
        } as MsgSetWithdrawAddress,
    };
};
