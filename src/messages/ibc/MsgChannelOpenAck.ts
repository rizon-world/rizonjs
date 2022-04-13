import { Message } from '../Message';
import { MsgChannelOpenAck } from '../../codec/ibc/core/channel/v1/tx';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgChannelOpenAckUrl = '/ibc.core.channel.v1.MsgChannelOpenAck';

export const BuildMsgChannelOpenAck = (
    portId: string,
    channelId: string,
    counterpartyChannelId: string,
    counterpartyVersion: string,
    signer: string,
    proofTry: Uint8Array,
    proofHeight?: Height,
): Message => {
    return {
        typeUrl: MsgChannelOpenAckUrl,
        value: {
            portId,
            channelId,
            counterpartyChannelId,
            counterpartyVersion,
            signer,
            proofTry,
            proofHeight,
        } as MsgChannelOpenAck,
    };
};
