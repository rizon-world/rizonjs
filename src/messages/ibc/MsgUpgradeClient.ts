import { Message } from '../Message';
import { MsgUpgradeClient } from '../../codec/ibc/core/client/v1/tx';
import { Any } from '../../codec/google/protobuf/any';

export const MsgUpgradeClientUrl = '/ibc.core.client.v1.MsgUpgradeClient';

export const BuildMsgUpgradeClient = (clientId: string, proofUpgradeClient: Uint8Array, signer: string, proofUpgradeConsensusState: Uint8Array, clientState?: Any, consensusState?: Any): Message => {
    return {
        typeUrl: MsgUpgradeClientUrl,
        value: {
            clientId,
            proofUpgradeClient,
            signer,
            proofUpgradeConsensusState,
            clientState,
            consensusState,
        } as MsgUpgradeClient,
    };
};
