import { Message } from '../Message';
import { MsgGrant } from '../../codec/cosmos/authz/v1beta1/tx';
import { Grant } from '../../codec/cosmos/authz/v1beta1/authz';

export const MsgGrantUrl = '/cosmos.authz.v1beta1.MsgGrant';

export const BuildMsgGrant = (granter: string, grantee: string, grant?: Grant): Message => {
    return {
        typeUrl: MsgGrantUrl,
        value: {
            granter,
            grantee,
            grant,
        } as MsgGrant,
    };
};
