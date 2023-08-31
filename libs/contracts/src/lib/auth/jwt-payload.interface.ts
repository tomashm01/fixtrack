export interface JwtPayloadInterface {
  id: string;
  email: string;
  password: string;
  role: string;
}

export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
  return arg && arg.email && arg.role && arg.id && arg.password;
}
