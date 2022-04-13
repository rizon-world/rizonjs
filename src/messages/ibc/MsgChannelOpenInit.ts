import { Message } from '../Message';
import { MsgChannelOpenInit } from '../../codec/ibc/core/channel/v1/tx';
import { Channel } from '../../codec/ibc/core/channel/v1/channel';

export const MsgChannelOpenInitUrl = '/ibc.core.channel.v1.MsgChannelOpenInit';

export const BuildMsgChannelOpenInit = (portId: string, signer: string, channel?: Channel): Message => {
    return {
        typeUrl: MsgChannelOpenInitUrl,
        value: {
            portId,
            signer,
            channel,
        } as MsgChannelOpenInit,
    };
};
