import { Message } from '../Message';
import { MsgUpdateClient } from '../../codec/ibc/core/client/v1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgUpdateClientUrl = '/ibc.core.client.v1.MsgUpdateClient';

export const BuildMsgUpdateClient = (clientId: string, signer: string, header?: Any): Message => {
    return {
        typeUrl: MsgUpdateClientUrl,
        value: {
            clientId,
            signer,
            header,
        } as MsgUpdateClient,
    };
};
