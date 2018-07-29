import { typeDefs } from '../src/domain/index.types';

test('basic', () => {
    expect(typeDefs.length).toBe(8);
});
