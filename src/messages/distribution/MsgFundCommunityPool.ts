import { Message } from '../Message';
import { Coin } from '../../types';
import { MsgFundCommunityPool } from '../../codec/cosmos/distribution/v1beta1/tx';

export const MsgFundCommunityPoolUrl = '/cosmos.distribution.v1beta1.MsgFundCommunityPool';

export const BuildMsgFundCommunityPool = (depositor: string, amount: Coin[]): Message => {
    return {
        typeUrl: MsgFundCommunityPoolUrl,
        value: {
            depositor,
            amount,
        } as MsgFundCommunityPool,
    };
};
