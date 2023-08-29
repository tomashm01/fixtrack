import { User } from '../model/user';
import { UserId } from '../model/user-id';
import { UserEmail } from '../model/user-email';

export interface UserRepository {
  find(userId: UserId): Promise<User | null>;
  findOneByEmail(username: UserEmail): Promise<User | null>;
  save(user: User): void;
  delete(userId: UserId): void;
}

export const userRepository = 'userRepository';
