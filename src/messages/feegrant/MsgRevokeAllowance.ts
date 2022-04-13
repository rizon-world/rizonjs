import { Message } from '../Message';
import { MsgRevokeAllowance } from '../../codec/cosmos/feegrant/v1beta1/tx';

export const MsgRevokeAllowanceUrl = '/cosmos.feegrant.v1beta1.MsgRevokeAllowance';

export const BuildMsgRevokeAllowance = (granter: string, grantee: string): Message => {
    return {
        typeUrl: MsgRevokeAllowanceUrl,
        value: {
            granter,
            grantee,
        } as MsgRevokeAllowance,
    };
};
