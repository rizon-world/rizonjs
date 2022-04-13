import { Message } from '../Message';
import { MsgChannelOpenTry } from '../../codec/ibc/core/channel/v1/tx';
import { Channel } from '../../codec/ibc/core/channel/v1/channel';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgChannelOpenTryUrl = '/ibc.core.channel.v1.MsgChannelOpenTry';

export const BuildMsgChannelOpenTry = (
    portId: string,
    previousChannelId: string,
    counterpartyVersion: string,
    signer: string,
    proofInit: Uint8Array,
    channel?: Channel,
    proofHeight?: Height,
): Message => {
    return {
        typeUrl: MsgChannelOpenTryUrl,
        value: {
            portId,
            previousChannelId,
            counterpartyVersion,
            signer,
            proofInit,
            channel,
            proofHeight,
        } as MsgChannelOpenTry,
    };
};
