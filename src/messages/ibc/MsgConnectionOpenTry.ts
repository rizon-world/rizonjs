import { Message } from '../Message';
import { MsgConnectionOpenTry } from '../../codec/ibc/core/connection/v1/tx';
import Long from 'long';
import { Counterparty, Version } from '../../codec/ibc/core/connection/v1/connection';
import { Any } from '../../codec/google/protobuf/any';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgConnectionOpenTryUrl = '/ibc.core.connection.v1.MsgConnectionOpenTry';

export const BuildMsgConnectionOpenTry = (
    signer: string,
    clientId: string,
    previousConnectionId: string,
    delayPeriod: Long.Long,
    counterpartyVersions: Version[],
    proofClient: Uint8Array,
    proofConsensus: Uint8Array,
    proofInit: Uint8Array,
    clientState?: Any,
    proofHeight?: Height,
    consensusHeight?: Height,
    counterparty?: Counterparty,
): Message => {
    return {
        typeUrl: MsgConnectionOpenTryUrl,
        value: {
            signer,
            clientId,
            previousConnectionId,
            delayPeriod,
            counterpartyVersions,
            proofClient,
            proofConsensus,
            proofInit,
            clientState,
            proofHeight,
            consensusHeight,
            counterparty,
        } as MsgConnectionOpenTry,
    };
};
