import { Message } from '../Message';
import { MsgChannelCloseConfirm } from '../../codec/ibc/core/channel/v1/tx';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgChannelCloseConfirmUrl = '/ibc.core.channel.v1.MsgChannelCloseConfirm';

export const BuildMsgChannelCloseConfirm = (channelId: string, portId: string, signer: string, proofInit: Uint8Array, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgChannelCloseConfirmUrl,
        value: {
            channelId,
            portId,
            signer,
            proofInit,
            proofHeight,
        } as MsgChannelCloseConfirm,
    };
};
