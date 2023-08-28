import { UserDTO } from '@fixtrack/contracts';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<Array<UserDTO>>;
}
