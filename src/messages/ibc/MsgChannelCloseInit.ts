import { Message } from '../Message';
import { MsgChannelCloseInit } from '../../codec/ibc/core/channel/v1/tx';

export const MsgChannelCloseInitUrl = '/ibc.core.channel.v1.MsgChannelCloseInit';

export const BuildMsgChannelCloseInit = (channelId: string, signer: string, portId: string): Message => {
    return {
        typeUrl: MsgChannelCloseInitUrl,
        value: {
            channelId,
            signer,
            portId,
        } as MsgChannelCloseInit,
    };
};
