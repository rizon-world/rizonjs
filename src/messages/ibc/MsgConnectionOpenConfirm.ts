import { Message } from '../Message';
import { MsgConnectionOpenConfirm } from '../../codec/ibc/core/connection/v1/tx';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgConnectionOpenConfirmUrl = '/ibc.core.connection.v1.MsgConnectionOpenConfirm';

export const BuildMsgConnectionOpenConfirm = (connectionId: string, signer: string, proofAck: Uint8Array, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgConnectionOpenConfirmUrl,
        value: {
            connectionId,
            signer,
            proofAck,
            proofHeight,
        } as MsgConnectionOpenConfirm,
    };
};
