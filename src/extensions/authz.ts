import { QueryClient } from '@cosmjs/stargate';

import { QueryClientImpl, QueryGrantsResponse } from '../codec/cosmos/authz/v1beta1/query';
import { PageRequest } from '../codec/cosmos/base/query/v1beta1/pagination';
import { createProtobufRpcClient } from './utils';

export interface AuthzExtension {
    readonly authz: {
        readonly grants: (granter: string, grantee: string, msgTypeUrl?: string, pagination?: PageRequest) => Promise<QueryGrantsResponse>;
    };
}

export function setupAuthzExtension(base: QueryClient): AuthzExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        authz: {
            grants: async (granter: string, grantee: string, msgTypeUrl?: string, pagination?: PageRequest) => {
                const response = queryService.Grants({
                    granter,
                    grantee,
                    msgTypeUrl: msgTypeUrl || '',
                    pagination,
                });
                return response;
            },
        },
    };
}
