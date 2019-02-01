import getGravatarProps from '../../Utils/getGravatarProps';
import md5 from 'md5';

describe('Test for Utils', () => {
  it('should return GravatarProps', () => {
    const emailId = 'example@gmail.com';
    const emailHash = md5(emailId);
    const gravatarImageUrl = `https://www.gravatar.com/avatar/${emailHash}.jpg`;
    const gravatarProps = getGravatarProps(emailId);
    expect(gravatarProps.src).not.toBeNull();
    expect(gravatarProps.name).not.toBeNull();
    expect(emailId.toUpperCase()).toEqual(gravatarProps.name);
    expect(gravatarImageUrl).toEqual(gravatarProps.src);
  });
});
