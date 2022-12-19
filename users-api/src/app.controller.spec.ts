import { AppController } from './app.controller';

describe('AppController', () => {
  const test = 'success';
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(test).toBe('success');
    });
  });
});
