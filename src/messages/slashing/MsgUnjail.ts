import { Message } from '../Message';
import { MsgUnjail } from '../../codec/cosmos/slashing/v1beta1/tx';

export const MsgUnjailUrl = '/cosmos.slashing.v1beta1.MsgUnjail';

export const BuildMsgUnjail = (validatorAddr: string): Message => {
    return {
        typeUrl: MsgUnjailUrl,
        value: {
            validatorAddr,
        } as MsgUnjail,
    };
};
