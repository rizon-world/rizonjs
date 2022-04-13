import { Message } from '../Message';
import { MsgRecvPacket } from '../../codec/ibc/core/channel/v1/tx';
import { Packet } from '../../codec/ibc/core/channel/v1/channel';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgRecvPacketUrl = '/ibc.core.channel.v1.MsgRecvPacket';

export const BuildMsgRecvPacket = (signer: string, proofCommitment: Uint8Array, packet?: Packet, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgRecvPacketUrl,
        value: {
            signer,
            proofCommitment,
            packet,
            proofHeight,
        } as MsgRecvPacket,
    };
};
