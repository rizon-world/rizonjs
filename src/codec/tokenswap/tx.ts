/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'rizonworld.rizon.tokenswap';

/** MsgCreateTokenswapRequest defines a SDK message for creating a new tokenswap */
export interface MsgCreateTokenswapRequest {
    /**
     * tx_hash is the tx hash of burn tx from legacy chain
     * tx_hash is used for store key
     */
    txHash: string;
    /** receiver is the target of tokenswap */
    receiver: string;
    /** signer is who confirms the swap process */
    signer: string;
    /** amount is the amount of swap process */
    amount: string;
}

/** MsgCreatetokenswapResponse defines the Msg/CreateTokenswap response type */
export interface MsgCreateTokenswapResponse {}

const baseMsgCreateTokenswapRequest: object = { txHash: '', receiver: '', signer: '', amount: '' };

export const MsgCreateTokenswapRequest = {
    encode(message: MsgCreateTokenswapRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.txHash !== '') {
            writer.uint32(10).string(message.txHash);
        }
        if (message.receiver !== '') {
            writer.uint32(18).string(message.receiver);
        }
        if (message.signer !== '') {
            writer.uint32(26).string(message.signer);
        }
        if (message.amount !== '') {
            writer.uint32(34).string(message.amount);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTokenswapRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateTokenswapRequest } as MsgCreateTokenswapRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.txHash = reader.string();
                    break;
                case 2:
                    message.receiver = reader.string();
                    break;
                case 3:
                    message.signer = reader.string();
                    break;
                case 4:
                    message.amount = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgCreateTokenswapRequest {
        const message = { ...baseMsgCreateTokenswapRequest } as MsgCreateTokenswapRequest;
        if (object.txHash !== undefined && object.txHash !== null) {
            message.txHash = String(object.txHash);
        } else {
            message.txHash = '';
        }
        if (object.receiver !== undefined && object.receiver !== null) {
            message.receiver = String(object.receiver);
        } else {
            message.receiver = '';
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        } else {
            message.signer = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = String(object.amount);
        } else {
            message.amount = '';
        }
        return message;
    },

    toJSON(message: MsgCreateTokenswapRequest): unknown {
        const obj: any = {};
        message.txHash !== undefined && (obj.txHash = message.txHash);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.signer !== undefined && (obj.signer = message.signer);
        message.amount !== undefined && (obj.amount = message.amount);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgCreateTokenswapRequest>): MsgCreateTokenswapRequest {
        const message = { ...baseMsgCreateTokenswapRequest } as MsgCreateTokenswapRequest;
        message.txHash = object.txHash ?? '';
        message.receiver = object.receiver ?? '';
        message.signer = object.signer ?? '';
        message.amount = object.amount ?? '';
        return message;
    },
};

const baseMsgCreateTokenswapResponse: object = {};

export const MsgCreateTokenswapResponse = {
    encode(_: MsgCreateTokenswapResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTokenswapResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgCreateTokenswapResponse } as MsgCreateTokenswapResponse;
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

    fromJSON(_: any): MsgCreateTokenswapResponse {
        const message = { ...baseMsgCreateTokenswapResponse } as MsgCreateTokenswapResponse;
        return message;
    },

    toJSON(_: MsgCreateTokenswapResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgCreateTokenswapResponse>): MsgCreateTokenswapResponse {
        const message = { ...baseMsgCreateTokenswapResponse } as MsgCreateTokenswapResponse;
        return message;
    },
};

/** Msg defines the tokenswap Msg service. */
export interface Msg {
    /** CreateTokenswap defines a method for creating a new tokenswap */
    CreateTokenswap(request: MsgCreateTokenswapRequest): Promise<MsgCreateTokenswapResponse>;
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
        this.CreateTokenswap = this.CreateTokenswap.bind(this);
    }
    CreateTokenswap(request: MsgCreateTokenswapRequest): Promise<MsgCreateTokenswapResponse> {
        const data = MsgCreateTokenswapRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.tokenswap.Msg', 'CreateTokenswap', data);
        return promise.then((data) => MsgCreateTokenswapResponse.decode(new _m0.Reader(data)));
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
