import { Message } from '../Message';
import { MsgCreateClient } from '../../codec/ibc/core/client/v1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgCreateClientUrl = '/ibc.core.client.v1.MsgCreateClient';

export const BuildMsgCreateClient = (signer: string, clientState?: Any, consensusState?: Any): Message => {
    return {
        typeUrl: MsgCreateClientUrl,
        value: {
            signer,
            clientState,
            consensusState,
        } as MsgCreateClient,
    };
};
