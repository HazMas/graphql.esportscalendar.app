import { Basic } from '../src/basic'

test('basic', () => {
    const basic = new Basic()
    expect(basic.test()).toBe(0);
    expect(basic.test()).not.toBe(-10);
    expect(basic.test()).not.toBe(10);
});
