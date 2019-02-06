import * as email from '../../Utils/isEmail';

describe('Test for isEmail', () => {
  it('should return true on matching regex', () => {
    expect(email.default('example@test.com')).not.toBeNull();
    expect(email.default(true)).not.toBeNull();
    expect(email.default('example@test.com')).toEqual(true);
    expect(email.default(true)).toEqual(false);
  });
});
