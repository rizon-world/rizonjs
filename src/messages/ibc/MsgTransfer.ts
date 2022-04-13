import { Message } from '../Message';
import { MsgTransfer } from '../../codec/ibc/applications/transfer/v1/tx';
import Long from 'long';
import { Height } from '../../codec/ibc/core/client/v1/client';
import { Coin } from '../../types';

export const MsgTransferUrl = '/ibc.applications.transfer.v1.MsgTransfer';

export const BuildMsgTransfer = (receiver: string, sender: string, sourceChannel: string, sourcePort: string, timeoutTimestamp: Long.Long, timeoutHeight?: Height, token?: Coin): Message => {
    return {
        typeUrl: MsgTransferUrl,
        value: {
            receiver,
            sender,
            sourceChannel,
            sourcePort,
            timeoutTimestamp,
            timeoutHeight,
            token,
        } as MsgTransfer,
    };
};
