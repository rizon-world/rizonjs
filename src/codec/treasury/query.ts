/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination';
import { Currencies, Currency, MaxAtoloSupply } from '../treasury/treasury';
import { Params } from '../treasury/params';

export const protobufPackage = 'rizonworld.rizon.treasury';

/** QueryCurrenciesRequest is request type for the Query/Currencies RPC method */
export interface QueryCurrenciesRequest {
    /** pagination defines an optional pagination for the request */
    pagination?: PageRequest;
}

/** QueryCurrenciesResponse is response type for the Query/Currencies RPC method */
export interface QueryCurrenciesResponse {
    /** Currencies defines all supported currency denom list */
    currencies?: Currencies;
    /** pagination defines the pagination in the response */
    pagination?: PageResponse;
}

/** QueryCurrencyRequest is request type for the Query/Currency RPC method */
export interface QueryCurrencyRequest {
    /** denom defines the denom to query for */
    denom: string;
}

/** QueryCurrencyResponse is response type for the Query/Currency RPC method */
export interface QueryCurrencyResponse {
    /** Currency defines a currency info */
    currency?: Currency;
}

/** QueryMaxRequest is request type for the Query/MaxAtoloSupply RPC method */
export interface QueryMaxRequest {}

/** QueryMaxResponse is response type for the Query/MaxAtoloSupply RPC method */
export interface QueryMaxResponse {
    /** params defines maximum mintable amount of uatolo */
    maxAtoloSupply?: MaxAtoloSupply;
}

/** QueryParamsRequest is request type for the Query/Params RPC method */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method */
export interface QueryParamsResponse {
    /** params defines the parameters of treasury module */
    params?: Params;
}

const baseQueryCurrenciesRequest: object = {};

export const QueryCurrenciesRequest = {
    encode(message: QueryCurrenciesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrenciesRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCurrenciesRequest } as QueryCurrenciesRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCurrenciesRequest {
        const message = { ...baseQueryCurrenciesRequest } as QueryCurrenciesRequest;
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromJSON(object.pagination);
        } else {
            message.pagination = undefined;
        }
        return message;
    },

    toJSON(message: QueryCurrenciesRequest): unknown {
        const obj: any = {};
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryCurrenciesRequest>): QueryCurrenciesRequest {
        const message = { ...baseQueryCurrenciesRequest } as QueryCurrenciesRequest;
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageRequest.fromPartial(object.pagination);
        } else {
            message.pagination = undefined;
        }
        return message;
    },
};

const baseQueryCurrenciesResponse: object = {};

export const QueryCurrenciesResponse = {
    encode(message: QueryCurrenciesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.currencies !== undefined) {
            Currencies.encode(message.currencies, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrenciesResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCurrenciesResponse } as QueryCurrenciesResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.currencies = Currencies.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCurrenciesResponse {
        const message = { ...baseQueryCurrenciesResponse } as QueryCurrenciesResponse;
        if (object.currencies !== undefined && object.currencies !== null) {
            message.currencies = Currencies.fromJSON(object.currencies);
        } else {
            message.currencies = undefined;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromJSON(object.pagination);
        } else {
            message.pagination = undefined;
        }
        return message;
    },

    toJSON(message: QueryCurrenciesResponse): unknown {
        const obj: any = {};
        message.currencies !== undefined && (obj.currencies = message.currencies ? Currencies.toJSON(message.currencies) : undefined);
        message.pagination !== undefined && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryCurrenciesResponse>): QueryCurrenciesResponse {
        const message = { ...baseQueryCurrenciesResponse } as QueryCurrenciesResponse;
        if (object.currencies !== undefined && object.currencies !== null) {
            message.currencies = Currencies.fromPartial(object.currencies);
        } else {
            message.currencies = undefined;
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = PageResponse.fromPartial(object.pagination);
        } else {
            message.pagination = undefined;
        }
        return message;
    },
};

const baseQueryCurrencyRequest: object = { denom: '' };

export const QueryCurrencyRequest = {
    encode(message: QueryCurrencyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denom !== '') {
            writer.uint32(10).string(message.denom);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrencyRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCurrencyRequest } as QueryCurrencyRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCurrencyRequest {
        const message = { ...baseQueryCurrencyRequest } as QueryCurrencyRequest;
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = String(object.denom);
        } else {
            message.denom = '';
        }
        return message;
    },

    toJSON(message: QueryCurrencyRequest): unknown {
        const obj: any = {};
        message.denom !== undefined && (obj.denom = message.denom);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryCurrencyRequest>): QueryCurrencyRequest {
        const message = { ...baseQueryCurrencyRequest } as QueryCurrencyRequest;
        message.denom = object.denom ?? '';
        return message;
    },
};

const baseQueryCurrencyResponse: object = {};

export const QueryCurrencyResponse = {
    encode(message: QueryCurrencyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.currency !== undefined) {
            Currency.encode(message.currency, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCurrencyResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryCurrencyResponse } as QueryCurrencyResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.currency = Currency.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryCurrencyResponse {
        const message = { ...baseQueryCurrencyResponse } as QueryCurrencyResponse;
        if (object.currency !== undefined && object.currency !== null) {
            message.currency = Currency.fromJSON(object.currency);
        } else {
            message.currency = undefined;
        }
        return message;
    },

    toJSON(message: QueryCurrencyResponse): unknown {
        const obj: any = {};
        message.currency !== undefined && (obj.currency = message.currency ? Currency.toJSON(message.currency) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryCurrencyResponse>): QueryCurrencyResponse {
        const message = { ...baseQueryCurrencyResponse } as QueryCurrencyResponse;
        if (object.currency !== undefined && object.currency !== null) {
            message.currency = Currency.fromPartial(object.currency);
        } else {
            message.currency = undefined;
        }
        return message;
    },
};

const baseQueryMaxRequest: object = {};

export const QueryMaxRequest = {
    encode(_: QueryMaxRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryMaxRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMaxRequest } as QueryMaxRequest;
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

    fromJSON(_: any): QueryMaxRequest {
        const message = { ...baseQueryMaxRequest } as QueryMaxRequest;
        return message;
    },

    toJSON(_: QueryMaxRequest): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<QueryMaxRequest>): QueryMaxRequest {
        const message = { ...baseQueryMaxRequest } as QueryMaxRequest;
        return message;
    },
};

const baseQueryMaxResponse: object = {};

export const QueryMaxResponse = {
    encode(message: QueryMaxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.maxAtoloSupply !== undefined) {
            MaxAtoloSupply.encode(message.maxAtoloSupply, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): QueryMaxResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryMaxResponse } as QueryMaxResponse;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.maxAtoloSupply = MaxAtoloSupply.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): QueryMaxResponse {
        const message = { ...baseQueryMaxResponse } as QueryMaxResponse;
        if (object.maxAtoloSupply !== undefined && object.maxAtoloSupply !== null) {
            message.maxAtoloSupply = MaxAtoloSupply.fromJSON(object.maxAtoloSupply);
        } else {
            message.maxAtoloSupply = undefined;
        }
        return message;
    },

    toJSON(message: QueryMaxResponse): unknown {
        const obj: any = {};
        message.maxAtoloSupply !== undefined && (obj.maxAtoloSupply = message.maxAtoloSupply ? MaxAtoloSupply.toJSON(message.maxAtoloSupply) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<QueryMaxResponse>): QueryMaxResponse {
        const message = { ...baseQueryMaxResponse } as QueryMaxResponse;
        if (object.maxAtoloSupply !== undefined && object.maxAtoloSupply !== null) {
            message.maxAtoloSupply = MaxAtoloSupply.fromPartial(object.maxAtoloSupply);
        } else {
            message.maxAtoloSupply = undefined;
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
    /** Currencies queries all supported currency denom list */
    Currencies(request: QueryCurrenciesRequest): Promise<QueryCurrenciesResponse>;
    /** Currency queries a currency info */
    Currency(request: QueryCurrencyRequest): Promise<QueryCurrencyResponse>;
    /** MaxAtoloSupply queries maximum mintable amount of uatolo */
    MaxAtoloSupply(request: QueryMaxRequest): Promise<QueryMaxResponse>;
    /** Params queries parameters of treasury */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
}

export class QueryClientImpl implements Query {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
        this.Currencies = this.Currencies.bind(this);
        this.Currency = this.Currency.bind(this);
        this.MaxAtoloSupply = this.MaxAtoloSupply.bind(this);
        this.Params = this.Params.bind(this);
    }
    Currencies(request: QueryCurrenciesRequest): Promise<QueryCurrenciesResponse> {
        const data = QueryCurrenciesRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Query', 'Currencies', data);
        return promise.then((data) => QueryCurrenciesResponse.decode(new _m0.Reader(data)));
    }

    Currency(request: QueryCurrencyRequest): Promise<QueryCurrencyResponse> {
        const data = QueryCurrencyRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Query', 'Currency', data);
        return promise.then((data) => QueryCurrencyResponse.decode(new _m0.Reader(data)));
    }

    MaxAtoloSupply(request: QueryMaxRequest): Promise<QueryMaxResponse> {
        const data = QueryMaxRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Query', 'MaxAtoloSupply', data);
        return promise.then((data) => QueryMaxResponse.decode(new _m0.Reader(data)));
    }

    Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Query', 'Params', data);
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
