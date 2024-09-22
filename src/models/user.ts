import { NO_DATA_MESSAGE } from '../constants';

export type UserDto = {
  user_email: string | undefined;
  user_password: string | undefined;
};

export const buildUser = (user: UserDto): User => {
  return new User(user);
};

export class User {
  userEmail: string | string;
  userPass: string | string;

  constructor(login: UserDto) {
    this.userEmail = login.user_email || NO_DATA_MESSAGE;
    this.userPass = login.user_password || NO_DATA_MESSAGE;
  }
}
