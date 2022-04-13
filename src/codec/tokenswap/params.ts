/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'rizonworld.rizon.tokenswap';

/** Params defines the parameters for the tokenswap module */
export interface Params {
    /** swappable indicates whether tokenswap module is enabled or not */
    swappable: boolean;
    /** signer is someone who can request tokenswap */
    signer: string;
    /** limit is the maximum swappable amount */
    limit: Long;
}

const baseParams: object = { swappable: false, signer: '', limit: Long.ZERO };

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.swappable === true) {
            writer.uint32(8).bool(message.swappable);
        }
        if (message.signer !== '') {
            writer.uint32(18).string(message.signer);
        }
        if (!message.limit.isZero()) {
            writer.uint32(24).int64(message.limit);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams } as Params;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.swappable = reader.bool();
                    break;
                case 2:
                    message.signer = reader.string();
                    break;
                case 3:
                    message.limit = reader.int64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Params {
        const message = { ...baseParams } as Params;
        if (object.swappable !== undefined && object.swappable !== null) {
            message.swappable = Boolean(object.swappable);
        } else {
            message.swappable = false;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        } else {
            message.signer = '';
        }
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = Long.fromString(object.limit);
        } else {
            message.limit = Long.ZERO;
        }
        return message;
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        message.swappable !== undefined && (obj.swappable = message.swappable);
        message.signer !== undefined && (obj.signer = message.signer);
        message.limit !== undefined && (obj.limit = (message.limit || Long.ZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params;
        message.swappable = object.swappable ?? false;
        message.signer = object.signer ?? '';
        if (object.limit !== undefined && object.limit !== null) {
            message.limit = object.limit as Long;
        } else {
            message.limit = Long.ZERO;
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
