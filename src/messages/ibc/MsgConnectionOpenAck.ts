import { Message } from '../Message';
import { MsgConnectionOpenAck } from '../../codec/ibc/core/connection/v1/tx';
import { Any } from '../../codec/google/protobuf/any';
import { Height } from '../../codec/ibc/core/client/v1/client';
import { Version } from '../../codec/ibc/core/connection/v1/connection';

export const MsgConnectionOpenAckUrl = '/ibc.core.connection.v1.MsgConnectionOpenAck';

export const BuildMsgConnectionOpenAck = (
    connectionId: string,
    signer: string,
    counterpartyConnectionId: string,
    proofClient: Uint8Array,
    proofConsensus: Uint8Array,
    proofTry: Uint8Array,
    clientState?: Any,
    proofHeight?: Height,
    consensusHeight?: Height,
    version?: Version,
): Message => {
    return {
        typeUrl: MsgConnectionOpenAckUrl,
        value: {
            connectionId,
            signer,
            counterpartyConnectionId,
            proofClient,
            proofConsensus,
            proofTry,
            clientState,
            proofHeight,
            consensusHeight,
            version,
        } as MsgConnectionOpenAck,
    };
};
