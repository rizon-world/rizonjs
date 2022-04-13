import { Message } from '../Message';
import { MsgRevoke } from '../../codec/cosmos/authz/v1beta1/tx';

export const MsgRevokeUrl = '/cosmos.authz.v1beta1.MsgRevoke';

export const BuildMsgRevoke = (granter: string, grantee: string, msgTypeUrl: string): Message => {
    return {
        typeUrl: MsgRevokeUrl,
        value: {
            granter,
            grantee,
            msgTypeUrl,
        } as MsgRevoke,
    };
};
