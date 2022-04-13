import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate';
import { assert } from '@cosmjs/utils';

import { RizonUtils } from '..';
import { Params } from '../codec/cosmos/mint/v1beta1/mint';
import { QueryClientImpl } from '../codec/cosmos/mint/v1beta1/query';

export interface MintExtension {
    readonly mint: {
        readonly params: () => Promise<Params>;
        readonly annualProvisions: () => Promise<string>;
        readonly inflation: () => Promise<string>;
    };
}

export const setupMintExtension = (base: QueryClient): MintExtension => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        mint: {
            params: async () => {
                const { params } = await queryService.Params({});
                assert(params);
                return params;
            },

            annualProvisions: async () => {
                const { annualProvisions } = await queryService.AnnualProvisions({});
                assert(annualProvisions);
                return RizonUtils.fromAscii(annualProvisions);
            },

            inflation: async () => {
                const { inflation } = await queryService.Inflation({});
                assert(inflation);
                return RizonUtils.fromAscii(inflation);
            },
        },
    };
};
