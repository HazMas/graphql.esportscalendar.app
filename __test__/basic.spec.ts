import { Basic } from '../src/basic'

test('basic', () => {
    let basic = new Basic()
    expect(basic.test()).toBe(0);
    expect(basic.test()).not.toBe(-10);
});
