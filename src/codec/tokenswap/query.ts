/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Tokenswap, SwappedAmount } from '../tokenswap/tokenswap';
import { Params } from '../tokenswap/params';

export const protobufPackage = 'rizonworld.rizon.tokenswap';

/** QueryTokenswapRequest is request type for the Query/Tokenswap RPC method */
export interface QueryTokenswapRequest {
    /** tx_hash defines the tx hash to query for */
    txHash: string;
}

/** QueryTokenswapResponse is response type for the Query/Tokenswap RPC method */
export interface QueryTokenswapResponse {
    /** tokenswap defines the tokenswap info */
    tokenswap?: Tokenswap;
}

/** QuerySwappedAmountRequest is request type for the Query/SwappedAmount RPC method */
export interface QuerySwappedAmountRequest {}

/** QuerySwappedAmountResponse is response type for the Query/SwappedAmount RPC method */
export interface QuerySwappedAmountResponse {
    /** amount defines current swapped amount of tokenswap */
    swappedAmount?: SwappedAmount;
}

/** QueryParamsRequest is request type for the Query/Params RPC method */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method */
export interface QueryParamsResponse {
    /** params defines the parameters of tokenswap */
    params?: Params;
}

const baseQueryTokenswapRequest: object = { txHash: '' };

export const QueryTokenswapRequest = {
    encode(message: QueryTokenswapRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.txHash !== '') {
            writer.uint32(10).string(message.txHash);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTokenswapRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryTokenswapRequest } as QueryTokenswapRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txHash = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryTokenswapRequest {
        const message = { ...baseQueryTokenswapRequest } as QueryTokenswapRequest;
        if (object.txHash !== undefined && object.txHash !== null) {
            message.txHash = String(object.txHash);
        } else {
            message.txHash = '';
        }
        return message;
    },

    toJSON(message: QueryTokenswapRequest): unknown {
        const obj: any = {};
        message.txHash !== undefined && (obj.txHash = message.txHash);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryTokenswapRequest>): QueryTokenswapRequest {
        const message = { ...baseQueryTokenswapRequest } as QueryTokenswapRequest;
        message.txHash = object.txHash ?? '';
        return message;
    },
};

const baseQueryTokenswapResponse: object = {};

export const QueryTokenswapResponse = {
    encode(message: QueryTokenswapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.tokenswap !== undefined) {
            Tokenswap.encode(message.tokenswap, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTokenswapResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryTokenswapResponse } as QueryTokenswapResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.tokenswap = Tokenswap.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryTokenswapResponse {
        const message = { ...baseQueryTokenswapResponse } as QueryTokenswapResponse;
        if (object.tokenswap !== undefined && object.tokenswap !== null) {
            message.tokenswap = Tokenswap.fromJSON(object.tokenswap);
        } else {
            message.tokenswap = undefined;
        }
        return message;
    },

    toJSON(message: QueryTokenswapResponse): unknown {
        const obj: any = {};
        message.tokenswap !== undefined && (obj.tokenswap = message.tokenswap ? Tokenswap.toJSON(message.tokenswap) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryTokenswapResponse>): QueryTokenswapResponse {
        const message = { ...baseQueryTokenswapResponse } as QueryTokenswapResponse;
        if (object.tokenswap !== undefined && object.tokenswap !== null) {
            message.tokenswap = Tokenswap.fromPartial(object.tokenswap);
        } else {
            message.tokenswap = undefined;
        }
        return message;
    },
};

const baseQuerySwappedAmountRequest: object = {};

export const QuerySwappedAmountRequest = {
    encode(_: QuerySwappedAmountRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwappedAmountRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySwappedAmountRequest } as QuerySwappedAmountRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(_: any): QuerySwappedAmountRequest {
        const message = { ...baseQuerySwappedAmountRequest } as QuerySwappedAmountRequest;
        return message;
    },

    toJSON(_: QuerySwappedAmountRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QuerySwappedAmountRequest>): QuerySwappedAmountRequest {
        const message = { ...baseQuerySwappedAmountRequest } as QuerySwappedAmountRequest;
        return message;
    },
};

const baseQuerySwappedAmountResponse: object = {};

export const QuerySwappedAmountResponse = {
    encode(message: QuerySwappedAmountResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.swappedAmount !== undefined) {
            SwappedAmount.encode(message.swappedAmount, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QuerySwappedAmountResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQuerySwappedAmountResponse } as QuerySwappedAmountResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.swappedAmount = SwappedAmount.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QuerySwappedAmountResponse {
        const message = { ...baseQuerySwappedAmountResponse } as QuerySwappedAmountResponse;
        if (object.swappedAmount !== undefined && object.swappedAmount !== null) {
            message.swappedAmount = SwappedAmount.fromJSON(object.swappedAmount);
        } else {
            message.swappedAmount = undefined;
        }
        return message;
    },

    toJSON(message: QuerySwappedAmountResponse): unknown {
        const obj: any = {};
        message.swappedAmount !== undefined && (obj.swappedAmount = message.swappedAmount ? SwappedAmount.toJSON(message.swappedAmount) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QuerySwappedAmountResponse>): QuerySwappedAmountResponse {
        const message = { ...baseQuerySwappedAmountResponse } as QuerySwappedAmountResponse;
        if (object.swappedAmount !== undefined && object.swappedAmount !== null) {
            message.swappedAmount = SwappedAmount.fromPartial(object.swappedAmount);
        } else {
            message.swappedAmount = undefined;
        }
        return message;
    },
};

const baseQueryParamsRequest: object = {};

export const QueryParamsRequest = {
    encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(_: any): QueryParamsRequest {
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
        return message;
    },

    toJSON(_: QueryParamsRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
        const message = { ...baseQueryParamsRequest } as QueryParamsRequest;
        return message;
    },
};

const baseQueryParamsResponse: object = {};

export const QueryParamsResponse = {
    encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryParamsResponse {
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromJSON(object.params);
        } else {
            message.params = undefined;
        }
        return message;
    },

    toJSON(message: QueryParamsResponse): unknown {
        const obj: any = {};
        message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
        const message = { ...baseQueryParamsResponse } as QueryParamsResponse;
        if (object.params !== undefined && object.params !== null) {
            message.params = Params.fromPartial(object.params);
        } else {
            message.params = undefined;
        }
        return message;
    },
};

/** Query defines the gRPC querier service */
export interface Query {
    /** Tokenswap queries tokenswap item for given tx hash */
    Tokenswap(request: QueryTokenswapRequest): Promise<QueryTokenswapResponse>;
    /** SwappedAmount queries current swapped amount of tokenswap */
    SwappedAmount(request: QuerySwappedAmountRequest): Promise<QuerySwappedAmountResponse>;
    /** Params queries parameters of tokenswap */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
        this.Tokenswap = this.Tokenswap.bind(this);
        this.SwappedAmount = this.SwappedAmount.bind(this);
        this.Params = this.Params.bind(this);
    }
    Tokenswap(request: QueryTokenswapRequest): Promise<QueryTokenswapResponse> {
        const data = QueryTokenswapRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.tokenswap.Query', 'Tokenswap', data);
        return promise.then((data) => QueryTokenswapResponse.decode(new _m0.Reader(data)));
    }

    SwappedAmount(request: QuerySwappedAmountRequest): Promise<QuerySwappedAmountResponse> {
        const data = QuerySwappedAmountRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.tokenswap.Query', 'SwappedAmount', data);
        return promise.then((data) => QuerySwappedAmountResponse.decode(new _m0.Reader(data)));
    }

    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.tokenswap.Query', 'Params', data);
        return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
    }
}

interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined | Long;
export type DeepPartial<T> = T extends Builtin
    ? T
    : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : T extends {}
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : Partial<T>;

if (_m0.util.Long !== Long) {
    _m0.util.Long = Long as any;
    _m0.configure();
}
