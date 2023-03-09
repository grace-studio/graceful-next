import cryptoModule from 'crypto';
import { generateUUID } from '../../src/utils';

describe('generateUUID', () => {
  it('should return a random UUID', () => {
    expect(generateUUID()).toHaveLength(32);
  });

  it('should return a random UUID in browser', () => {
    const originalWindow = global.window;
    global.window = {
      crypto: cryptoModule,
    } as any;
    expect(generateUUID()).toHaveLength(32);
    global.window = originalWindow;
  });

  it('should be unique', () => {
    const first = generateUUID();
    expect(generateUUID()).not.toBe(first);
  });
});
