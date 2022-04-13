import { Message } from '../Message';
import { MsgConnectionOpenInit } from '../../codec/ibc/core/connection/v1/tx';
import Long from 'long';
import { Version, Counterparty } from '../../codec/ibc/core/connection/v1/connection';

export const MsgConnectionOpenInitUrl = '/ibc.core.connection.v1.MsgConnectionOpenInit';

export const BuildMsgConnectionOpenInit = (clientId: string, signer: string, delayPeriod: Long.Long, counterparty?: Counterparty, version?: Version): Message => {
    return {
        typeUrl: MsgConnectionOpenInitUrl,
        value: {
            clientId,
            signer,
            delayPeriod,
            counterparty,
            version,
        } as MsgConnectionOpenInit,
    };
};
