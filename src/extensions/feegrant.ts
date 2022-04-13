import { QueryClient } from '@cosmjs/stargate';

import { QueryAllowanceResponse, QueryAllowancesResponse, QueryClientImpl } from '../codec/cosmos/feegrant/v1beta1/query';
import { PageRequest } from '../codec/cosmos/base/query/v1beta1/pagination';
import { createProtobufRpcClient } from './utils';

export interface FeegrantExtension {
    readonly feegrant: {
        readonly allowance: (granter: string, grantee: string) => Promise<QueryAllowanceResponse>;
        readonly allowances: (grantee: string, pagination?: PageRequest) => Promise<QueryAllowancesResponse>;
    };
}

export function setupFeegrantExtension(base: QueryClient): FeegrantExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        feegrant: {
            allowance: async (granter: string, grantee: string) => {
                const response = queryService.Allowance({
                    granter,
                    grantee,
                });
                return response;
            },
            allowances: async (grantee: string, pagination?: PageRequest) => {
                const response = queryService.Allowances({
                    grantee,
                    pagination,
                });
                return response;
            },
        },
    };
}
