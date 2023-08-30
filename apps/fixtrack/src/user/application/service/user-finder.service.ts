import { UserDTO } from '@fixtrack/contracts';
import { UserEmail, UserId } from '../../domain';

export const USER_FINDER = 'USER_FINDER';

export interface UserFinder {
  findAll(): Promise<Array<UserDTO>>;
  findByEmail(email: UserEmail): Promise<UserDTO | null>;
  findById(id: UserId): Promise<UserDTO | null>;
}
