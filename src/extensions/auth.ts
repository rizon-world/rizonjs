import { QueryClient } from '@cosmjs/stargate';

import { Any } from '../codec/google/protobuf/any';
import { QueryClientImpl } from '../codec/cosmos/auth/v1beta1/query';
import { createProtobufRpcClient } from './utils';

export interface AuthExtension {
    readonly auth: {
        readonly account: (address: string) => Promise<Any | null>;
    };
}

export function setupAuthExtension(base: QueryClient): AuthExtension {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);

    return {
        auth: {
            account: async (address: string) => {
                const { account } = await queryService.Account({ address: address });
                return account ?? null;
            },
        },
    };
}
