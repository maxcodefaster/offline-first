import { SuperloginMiddleware } from './superlogin.middleware';

describe('SuperloginMiddleware', () => {
  it('should be defined', () => {
    expect(new SuperloginMiddleware()).toBeDefined();
  });
});
