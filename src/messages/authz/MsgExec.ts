import { Message } from '../Message';
import { MsgExec } from '../../codec/cosmos/authz/v1beta1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgExecUrl = '/cosmos.authz.v1beta1.MsgExec';

export const BuildMsgExec = (grantee: string, msgs: Any[]): Message => {
    return {
        typeUrl: MsgExecUrl,
        value: {
            grantee,
            msgs,
        } as MsgExec,
    };
};
