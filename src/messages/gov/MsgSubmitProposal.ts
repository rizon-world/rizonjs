import { Message } from '../Message';
import { Coin } from '../../types';
import { Any } from '../../codec/google/protobuf/any';
import { MsgSubmitProposal } from '../../codec/cosmos/gov/v1beta1/tx';

export const MsgSubmitProposalUrl = '/cosmos.gov.v1beta1.MsgSubmitProposal';

export const BuildMsgSubmitProposal = (proposer: string, initialDeposit: Coin[], content?: Any): Message => {
    return {
        typeUrl: MsgSubmitProposalUrl,
        value: {
            initialDeposit,
            proposer,
            content,
        } as MsgSubmitProposal,
    };
};
