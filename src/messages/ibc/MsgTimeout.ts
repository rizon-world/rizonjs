import { Message } from '../Message';
import { MsgTimeout } from '../../codec/ibc/core/channel/v1/tx';
import Long from 'long';
import { Packet } from '../../codec/ibc/core/channel/v1/channel';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgTimeoutUrl = '/ibc.core.channel.v1.MsgTimeout';

export const BuildMsgTimeout = (nextSequenceRecv: Long.Long, proofUnreceived: Uint8Array, signer: string, packet?: Packet, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgTimeoutUrl,
        value: {
            nextSequenceRecv,
            packet,
            proofHeight,
            proofUnreceived,
            signer,
        } as MsgTimeout,
    };
};
