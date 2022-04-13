import { Message } from '../Message';
import { MsgAcknowledgement } from '../../codec/ibc/core/channel/v1/tx';
import { Packet } from '../../codec/ibc/core/channel/v1/channel';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgAcknowledgementUrl = '/ibc.core.channel.v1.MsgAcknowledgement';

export const BuildMsgAcknowledgement = (acknowledgement: Uint8Array, proofAcked: Uint8Array, signer: string, packet?: Packet, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgAcknowledgementUrl,
        value: {
            acknowledgement,
            proofAcked,
            signer,
            packet,
            proofHeight,
        } as MsgAcknowledgement,
    };
};
