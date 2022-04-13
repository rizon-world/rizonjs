/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';
import { Currency } from '../treasury/treasury';

export const protobufPackage = 'rizonworld.rizon.treasury';

/** Params defines the parameters for the treasury module */
export interface Params {
    /** mintable indicates whether every currencie of treasury module are able to mint or not */
    mintable: boolean;
    /** sequence of currency state */
    sequence: Long;
    /** currency_list is the list of supported currencies */
    currencyList: Currency[];
}

const baseParams: object = { mintable: false, sequence: Long.ZERO };

export const Params = {
    encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.mintable === true) {
            writer.uint32(8).bool(message.mintable);
        }
        if (!message.sequence.isZero()) {
            writer.uint32(16).int64(message.sequence);
        }
        for (const v of message.currencyList) {
            Currency.encode(v!, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Params {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseParams } as Params;
        message.currencyList = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mintable = reader.bool();
                    break;
                case 2:
                    message.sequence = reader.int64() as Long;
                    break;
                case 3:
                    message.currencyList.push(Currency.decode(reader, reader.uint32()));
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
        message.currencyList = [];
        if (object.mintable !== undefined && object.mintable !== null) {
            message.mintable = Boolean(object.mintable);
        } else {
            message.mintable = false;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Long.fromString(object.sequence);
        } else {
            message.sequence = Long.ZERO;
        }
        if (object.currencyList !== undefined && object.currencyList !== null) {
            for (const e of object.currencyList) {
                message.currencyList.push(Currency.fromJSON(e));
            }
        }
        return message;
    },

    toJSON(message: Params): unknown {
        const obj: any = {};
        message.mintable !== undefined && (obj.mintable = message.mintable);
        message.sequence !== undefined && (obj.sequence = (message.sequence || Long.ZERO).toString());
        if (message.currencyList) {
            obj.currencyList = message.currencyList.map((e) => (e ? Currency.toJSON(e) : undefined));
        } else {
            obj.currencyList = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Params>): Params {
        const message = { ...baseParams } as Params;
        message.mintable = object.mintable ?? false;
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence as Long;
        } else {
            message.sequence = Long.ZERO;
        }
        message.currencyList = [];
        if (object.currencyList !== undefined && object.currencyList !== null) {
            for (const e of object.currencyList) {
                message.currencyList.push(Currency.fromPartial(e));
            }
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
