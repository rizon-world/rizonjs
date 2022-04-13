import { Message } from '../Message';
import { MsgGrantAllowance } from '../../codec/cosmos/feegrant/v1beta1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgGrantAllowanceUrl = '/cosmos.feegrant.v1beta1.MsgGrantAllowance';

export const BuildMsgGrantAllowance = (granter: string, grantee: string, allowance?: Any): Message => {
    return {
        typeUrl: MsgGrantAllowanceUrl,
        value: {
            granter,
            grantee,
            allowance,
        } as MsgGrantAllowance,
    };
};
