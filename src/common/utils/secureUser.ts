import { User } from '../../api/user/interface/user.interface';

export default (user: User) => {
  const secureUser = { ...user };
  delete secureUser.password;
  return secureUser;
};
