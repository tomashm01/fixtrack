export interface CredentialsInterface {
  email: string;
  password: string;
}

export function isCredentials(arg: any): arg is CredentialsInterface {
  return arg && arg.email && arg.password;
}
