import { UserDTO } from '@fixtrack/contracts';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<Array<UserDTO>>;
  findByEmail(email: string): Promise<UserDTO | null>;
  findById(id: string): Promise<UserDTO | null>;
}
