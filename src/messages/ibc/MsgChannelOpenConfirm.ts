import { Message } from '../Message';
import { MsgChannelOpenConfirm } from '../../codec/ibc/core/channel/v1/tx';
import { Height } from '../../codec/ibc/core/client/v1/client';

export const MsgChannelOpenConfirmUrl = '/ibc.core.channel.v1.MsgChannelOpenConfirm';

export const BuildMsgChannelOpenConfirm = (channelId: string, portId: string, signer: string, proofAck: Uint8Array, proofHeight?: Height): Message => {
    return {
        typeUrl: MsgChannelOpenConfirmUrl,
        value: {
            channelId,
            portId,
            signer,
            proofAck,
            proofHeight,
        } as MsgChannelOpenConfirm,
    };
};
