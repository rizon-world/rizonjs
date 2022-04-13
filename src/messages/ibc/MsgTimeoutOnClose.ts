import { Message } from '../Message';
import { MsgTimeoutOnClose } from '../../codec/ibc/core/channel/v1/tx';
import Long from 'long';
import { Packet } from '../../codec/ibc/core/channel/v1/channel';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgTimeoutOnCloseUrl = '/ibc.core.channel.v1.MsgTimeoutOnClose';

export const BuildMsgTimeoutOnClose = (nextSequenceRecv: Long.Long, signer: string, proofClose: Uint8Array, proofUnreceived: Uint8Array, packet?: Packet, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgTimeoutOnCloseUrl,
        value: {
            nextSequenceRecv,
            signer,
            proofClose,
            proofUnreceived,
            packet,
            proofHeight,
        } as MsgTimeoutOnClose,
    };
};
