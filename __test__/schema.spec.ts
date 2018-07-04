import { typeDefs } from '../src/schema'

test('basic', () => {
    expect(typeDefs.length).toBe(8);
});
