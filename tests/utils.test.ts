import { RizonConstants, RizonUtils } from '../src';

describe('Utils', () => {
    it('Unit conversion should output consistent results', () => {
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '23456789' }, RizonConstants.MicroRizonDenom)).toEqual('23456789');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.RizonDenom, amount: '23.456789' }, RizonConstants.RizonDenom)).toEqual('23.456789');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.RizonDenom, amount: '23.456789' }, RizonConstants.MicroRizonDenom)).toEqual('23456789');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.RizonDenom, amount: '23456789' }, RizonConstants.MicroRizonDenom)).toEqual('23456789000000');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '123456789000' }, RizonConstants.RizonDenom)).toEqual('123456.789');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '123456789111' }, RizonConstants.RizonDenom)).toEqual('123456.789111');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '123456' }, RizonConstants.RizonDenom)).toEqual('0.123456');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '23456' }, RizonConstants.RizonDenom)).toEqual('0.023456');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.RizonDenom, amount: '0.000001' }, RizonConstants.MicroRizonDenom)).toEqual('1');
        expect(RizonUtils.convertUnit({ denom: RizonConstants.MicroRizonDenom, amount: '1' }, RizonConstants.RizonDenom)).toEqual('0.000001');
    });
});
