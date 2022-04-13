import Long from 'long';

import { Message } from '../Message';
import { Coin } from '../../types';
import { MsgDeposit } from '../../codec/cosmos/gov/v1beta1/tx';

export const MsgDepositUrl = '/cosmos.gov.v1beta1.MsgDeposit';

export const BuildMsgDeposit = (proposalId: Long, depositor: string, amount: Coin[]): Message => {
    return {
        typeUrl: MsgDepositUrl,
        value: {
            proposalId,
            depositor,
            amount,
        } as MsgDeposit,
    };
};
