/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../cosmos/base/v1beta1/coin';

export const protobufPackage = 'rizonworld.rizon.treasury';

/** MsgMintRequest defines the Msg/Mint request type */
export interface MsgMintRequest {
    /** receiver is the target address of minted coins */
    receiver: string;
    /** signer is who requests minting */
    signer: string;
    /** amount is the amount to mint */
    amount?: Coin;
}

/** MsgMintResponse defines the Msg/Mint response type */
export interface MsgMintResponse {}

/** MsgBurnRequest defines the Msg/Burn request type */
export interface MsgBurnRequest {
    /** signer is who requests burning */
    signer: string;
    /** amount is the amount to burn */
    amount?: Coin;
}

/** MsgBurnResponse defines the Msg/Burn response type */
export interface MsgBurnResponse {}

const baseMsgMintRequest: object = { receiver: '', signer: '' };

export const MsgMintRequest = {
    encode(message: MsgMintRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.receiver !== '') {
            writer.uint32(10).string(message.receiver);
        }
        if (message.signer !== '') {
            writer.uint32(18).string(message.signer);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintRequest } as MsgMintRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.receiver = reader.string();
                    break;
                case 2:
                    message.signer = reader.string();
                    break;
                case 3:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgMintRequest {
        const message = { ...baseMsgMintRequest } as MsgMintRequest;
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
            message.amount = Coin.fromJSON(object.amount);
        } else {
            message.amount = undefined;
        }
        return message;
    },

    toJSON(message: MsgMintRequest): unknown {
        const obj: any = {};
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.signer !== undefined && (obj.signer = message.signer);
        message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgMintRequest>): MsgMintRequest {
        const message = { ...baseMsgMintRequest } as MsgMintRequest;
        message.receiver = object.receiver ?? '';
        message.signer = object.signer ?? '';
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromPartial(object.amount);
        } else {
            message.amount = undefined;
        }
        return message;
    },
};

const baseMsgMintResponse: object = {};

export const MsgMintResponse = {
    encode(_: MsgMintResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgMintResponse } as MsgMintResponse;
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

    fromJSON(_: any): MsgMintResponse {
        const message = { ...baseMsgMintResponse } as MsgMintResponse;
        return message;
    },

    toJSON(_: MsgMintResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgMintResponse>): MsgMintResponse {
        const message = { ...baseMsgMintResponse } as MsgMintResponse;
        return message;
    },
};

const baseMsgBurnRequest: object = { signer: '' };

export const MsgBurnRequest = {
    encode(message: MsgBurnRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.signer !== '') {
            writer.uint32(10).string(message.signer);
        }
        if (message.amount !== undefined) {
            Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnRequest {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBurnRequest } as MsgBurnRequest;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signer = reader.string();
                    break;
                case 2:
                    message.amount = Coin.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): MsgBurnRequest {
        const message = { ...baseMsgBurnRequest } as MsgBurnRequest;
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        } else {
            message.signer = '';
        }
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromJSON(object.amount);
        } else {
            message.amount = undefined;
        }
        return message;
    },

    toJSON(message: MsgBurnRequest): unknown {
        const obj: any = {};
        message.signer !== undefined && (obj.signer = message.signer);
        message.amount !== undefined && (obj.amount = message.amount ? Coin.toJSON(message.amount) : undefined);
        return obj;
    },

    fromPartial(object: DeepPartial<MsgBurnRequest>): MsgBurnRequest {
        const message = { ...baseMsgBurnRequest } as MsgBurnRequest;
        message.signer = object.signer ?? '';
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Coin.fromPartial(object.amount);
        } else {
            message.amount = undefined;
        }
        return message;
    },
};

const baseMsgBurnResponse: object = {};

export const MsgBurnResponse = {
    encode(_: MsgBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnResponse {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
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

    fromJSON(_: any): MsgBurnResponse {
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
        return message;
    },

    toJSON(_: MsgBurnResponse): unknown {
        const obj: any = {};
        return obj;
    },

    fromPartial(_: DeepPartial<MsgBurnResponse>): MsgBurnResponse {
        const message = { ...baseMsgBurnResponse } as MsgBurnResponse;
        return message;
    },
};

/** Msg defines the treasury Msg service. */
export interface Msg {
    /** Mint defines a method for minting coins */
    Mint(request: MsgMintRequest): Promise<MsgMintResponse>;
    /** Burn defines a method for burning coins */
    Burn(request: MsgBurnRequest): Promise<MsgBurnResponse>;
}

export class MsgClientImpl implements Msg {
    private readonly rpc: Rpc;
    constructor(rpc: Rpc) {
        this.rpc = rpc;
        this.Mint = this.Mint.bind(this);
        this.Burn = this.Burn.bind(this);
    }
    Mint(request: MsgMintRequest): Promise<MsgMintResponse> {
        const data = MsgMintRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Msg', 'Mint', data);
        return promise.then((data) => MsgMintResponse.decode(new _m0.Reader(data)));
    }

    Burn(request: MsgBurnRequest): Promise<MsgBurnResponse> {
        const data = MsgBurnRequest.encode(request).finish();
        const promise = this.rpc.request('rizonworld.rizon.treasury.Msg', 'Burn', data);
        return promise.then((data) => MsgBurnResponse.decode(new _m0.Reader(data)));
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
