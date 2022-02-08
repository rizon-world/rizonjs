import { foobar } from '../src';

describe('foobar', () => {
    it('answers', () => {
        expect(foobar('foo')).toBe('bar');
        expect(foobar('bar')).toBe('foo');
        expect(foobar('something')).toBe('foobar');
    });
});
