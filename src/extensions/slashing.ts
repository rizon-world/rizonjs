import { QueryClient } from '@cosmjs/stargate';

import { QueryClientImpl, QueryParamsResponse, QuerySigningInfoResponse, QuerySigningInfosResponse } from '../codec/cosmos/slashing/v1beta1/query';
import { PageRequest } from '../codec/cosmos/base/query/v1beta1/pagination';
import { createProtobufRpcClient } from './utils';

export interface SlashingExtension {
    readonly slashing: {
        readonly params: () => Promise<QueryParamsResponse>;
        readonly signing_info: (consAddress: string) => Promise<QuerySigningInfoResponse>;
        readonly signing_infos: (pagination?: PageRequest) => Promise<QuerySigningInfosResponse>;
    };
}

export function setupSlashingExtension(base: QueryClient): SlashingExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        slashing: {
            params: async () => {
                const response = queryService.Params({});
                return response;
            },
            signing_info: async (consAddress: string) => {
                const response = queryService.SigningInfo({
                    consAddress,
                });
                return response;
            },
            signing_infos: async (pagination?: PageRequest) => {
                const response = queryService.SigningInfos({
                    pagination,
                });
                return response;
            },
        },
    };
}
