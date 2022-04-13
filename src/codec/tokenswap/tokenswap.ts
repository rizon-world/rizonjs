/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Coin } from '../cosmos/base/v1beta1/coin';

export const protobufPackage = 'rizonworld.rizon.tokenswap';

/** Tokenswap defines the tokenswap state */
export interface Tokenswap {
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
    amount: Coin[];
}

/** Current swapped amount of tokenswap module */
export interface SwappedAmount {
    /** amount is the amount of already swapped */
    amount: Long;
}

const baseTokenswap: object = { txHash: '', receiver: '', signer: '' };

export const Tokenswap = {
    encode(message: Tokenswap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.txHash !== '') {
            writer.uint32(10).string(message.txHash);
        }
        if (message.receiver !== '') {
            writer.uint32(18).string(message.receiver);
        }
        if (message.signer !== '') {
            writer.uint32(26).string(message.signer);
        }
        for (const v of message.amount) {
            Coin.encode(v!, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Tokenswap {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTokenswap } as Tokenswap;
        message.amount = [];
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
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Tokenswap {
        const message = { ...baseTokenswap } as Tokenswap;
        message.amount = [];
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
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Tokenswap): unknown {
        const obj: any = {};
        message.txHash !== undefined && (obj.txHash = message.txHash);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        message.signer !== undefined && (obj.signer = message.signer);
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
        } else {
            obj.amount = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Tokenswap>): Tokenswap {
        const message = { ...baseTokenswap } as Tokenswap;
        message.txHash = object.txHash ?? '';
        message.receiver = object.receiver ?? '';
        message.signer = object.signer ?? '';
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e));
            }
        }
        return message;
    },
};

const baseSwappedAmount: object = { amount: Long.ZERO };

export const SwappedAmount = {
    encode(message: SwappedAmount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.amount.isZero()) {
            writer.uint32(8).int64(message.amount);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): SwappedAmount {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSwappedAmount } as SwappedAmount;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount = reader.int64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): SwappedAmount {
        const message = { ...baseSwappedAmount } as SwappedAmount;
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Long.fromString(object.amount);
        } else {
            message.amount = Long.ZERO;
        }
        return message;
    },

    toJSON(message: SwappedAmount): unknown {
        const obj: any = {};
        message.amount !== undefined && (obj.amount = (message.amount || Long.ZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<SwappedAmount>): SwappedAmount {
        const message = { ...baseSwappedAmount } as SwappedAmount;
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount as Long;
        } else {
            message.amount = Long.ZERO;
        }
        return message;
    },
};

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
