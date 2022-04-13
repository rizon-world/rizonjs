import { Message } from '../Message';
import { MsgSubmitMisbehaviour } from '../../codec/ibc/core/client/v1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgSubmitMisbehaviourUrl = '/ibc.core.client.v1.MsgSubmitMisbehaviour';

export const BuildMsgSubmitMisbehaviour = (signer: string, clientId: string, misbehaviour?: Any): Message => {
    return {
        typeUrl: MsgSubmitMisbehaviourUrl,
        value: {
            signer,
            clientId,
            misbehaviour,
        } as MsgSubmitMisbehaviour,
    };
};
