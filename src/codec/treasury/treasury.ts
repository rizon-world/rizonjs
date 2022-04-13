/* eslint-disable */
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'rizonworld.rizon.treasury';

/** Currency defines a single currency info */
export interface Currency {
    /** denom is the name of the currency */
    denom: string;
    /** desc is a description of the currency */
    desc: string;
    /** owner is who can mint this currency */
    owner: string;
    /** mintable indicates whether this currency can be minted or not */
    mintable: boolean;
}

/** Currencies */
export interface Currencies {
    /** denoms is the denom list of all currencies */
    denoms: string[];
}

/** Maximum mintable amount of atolo */
export interface MaxAtoloSupply {
    /** amount is maximum mintable amount of atolo */
    amount: Long;
}

/** Sequence */
export interface Sequence {
    /** number is the currency sequence number of current state */
    number: Long;
}

const baseCurrency: object = { denom: '', desc: '', owner: '', mintable: false };

export const Currency = {
    encode(message: Currency, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (message.denom !== '') {
            writer.uint32(10).string(message.denom);
        }
        if (message.desc !== '') {
            writer.uint32(18).string(message.desc);
        }
        if (message.owner !== '') {
            writer.uint32(26).string(message.owner);
        }
        if (message.mintable === true) {
            writer.uint32(32).bool(message.mintable);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Currency {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCurrency } as Currency;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denom = reader.string();
                    break;
                case 2:
                    message.desc = reader.string();
                    break;
                case 3:
                    message.owner = reader.string();
                    break;
                case 4:
                    message.mintable = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Currency {
        const message = { ...baseCurrency } as Currency;
        if (object.denom !== undefined && object.denom !== null) {
            message.denom = String(object.denom);
        } else {
            message.denom = '';
        }
        if (object.desc !== undefined && object.desc !== null) {
            message.desc = String(object.desc);
        } else {
            message.desc = '';
        }
        if (object.owner !== undefined && object.owner !== null) {
            message.owner = String(object.owner);
        } else {
            message.owner = '';
        }
        if (object.mintable !== undefined && object.mintable !== null) {
            message.mintable = Boolean(object.mintable);
        } else {
            message.mintable = false;
        }
        return message;
    },

    toJSON(message: Currency): unknown {
        const obj: any = {};
        message.denom !== undefined && (obj.denom = message.denom);
        message.desc !== undefined && (obj.desc = message.desc);
        message.owner !== undefined && (obj.owner = message.owner);
        message.mintable !== undefined && (obj.mintable = message.mintable);
        return obj;
    },

    fromPartial(object: DeepPartial<Currency>): Currency {
        const message = { ...baseCurrency } as Currency;
        message.denom = object.denom ?? '';
        message.desc = object.desc ?? '';
        message.owner = object.owner ?? '';
        message.mintable = object.mintable ?? false;
        return message;
    },
};

const baseCurrencies: object = { denoms: '' };

export const Currencies = {
    encode(message: Currencies, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        for (const v of message.denoms) {
            writer.uint32(10).string(v!);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Currencies {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCurrencies } as Currencies;
        message.denoms = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.denoms.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Currencies {
        const message = { ...baseCurrencies } as Currencies;
        message.denoms = [];
        if (object.denoms !== undefined && object.denoms !== null) {
            for (const e of object.denoms) {
                message.denoms.push(String(e));
            }
        }
        return message;
    },

    toJSON(message: Currencies): unknown {
        const obj: any = {};
        if (message.denoms) {
            obj.denoms = message.denoms.map((e) => e);
        } else {
            obj.denoms = [];
        }
        return obj;
    },

    fromPartial(object: DeepPartial<Currencies>): Currencies {
        const message = { ...baseCurrencies } as Currencies;
        message.denoms = [];
        if (object.denoms !== undefined && object.denoms !== null) {
            for (const e of object.denoms) {
                message.denoms.push(e);
            }
        }
        return message;
    },
};

const baseMaxAtoloSupply: object = { amount: Long.ZERO };

export const MaxAtoloSupply = {
    encode(message: MaxAtoloSupply, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.amount.isZero()) {
            writer.uint32(8).int64(message.amount);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): MaxAtoloSupply {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMaxAtoloSupply } as MaxAtoloSupply;
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

    fromJSON(object: any): MaxAtoloSupply {
        const message = { ...baseMaxAtoloSupply } as MaxAtoloSupply;
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = Long.fromString(object.amount);
        } else {
            message.amount = Long.ZERO;
        }
        return message;
    },

    toJSON(message: MaxAtoloSupply): unknown {
        const obj: any = {};
        message.amount !== undefined && (obj.amount = (message.amount || Long.ZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<MaxAtoloSupply>): MaxAtoloSupply {
        const message = { ...baseMaxAtoloSupply } as MaxAtoloSupply;
        if (object.amount !== undefined && object.amount !== null) {
            message.amount = object.amount as Long;
        } else {
            message.amount = Long.ZERO;
        }
        return message;
    },
};

const baseSequence: object = { number: Long.ZERO };

export const Sequence = {
    encode(message: Sequence, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
        if (!message.number.isZero()) {
            writer.uint32(8).int64(message.number);
        }
        return writer;
    },

    decode(input: _m0.Reader | Uint8Array, length?: number): Sequence {
        const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSequence } as Sequence;
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.number = reader.int64() as Long;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },

    fromJSON(object: any): Sequence {
        const message = { ...baseSequence } as Sequence;
        if (object.number !== undefined && object.number !== null) {
            message.number = Long.fromString(object.number);
        } else {
            message.number = Long.ZERO;
        }
        return message;
    },

    toJSON(message: Sequence): unknown {
        const obj: any = {};
        message.number !== undefined && (obj.number = (message.number || Long.ZERO).toString());
        return obj;
    },

    fromPartial(object: DeepPartial<Sequence>): Sequence {
        const message = { ...baseSequence } as Sequence;
        if (object.number !== undefined && object.number !== null) {
            message.number = object.number as Long;
        } else {
            message.number = Long.ZERO;
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
