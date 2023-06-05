import cryptoModule from 'crypto';
import { generateUUID } from '../../lib/utils/generateUUID';

describe('generateUUID', () => {
  it('should match pattern ^[a-z0-9]{32}$', () => {
    expect(generateUUID()).toMatch(/^[a-z0-9]{32}$/);
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
