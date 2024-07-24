import { NO_DATA_MESSAGE } from '../constants';

export type SignInDto = {
  sign_in_email: string | undefined;
  sign_in_pass: string | undefined;
};

export const buildSignIn = (signIn: SignInDto): SignIn => {
  return new SignIn(signIn);
};

export class SignIn {
  signInEmail: string | string;
  signInPass: string | string;

  constructor(signIn: SignInDto) {
    this.signInEmail = signIn.sign_in_email || NO_DATA_MESSAGE;
    this.signInPass = signIn.sign_in_pass || NO_DATA_MESSAGE;
  }
}
