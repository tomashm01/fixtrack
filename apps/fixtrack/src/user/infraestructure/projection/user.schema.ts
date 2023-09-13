import { UserDTO } from '@fixtrack/contracts';
import { Document, Schema } from 'mongoose';

export const USER_PROJECTION = 'users';

export type UserDocument = UserDTO & Document;

export const UserSchema = new Schema(
  {
    _id: String,
    email: { type: String, index: { unique: true } },
    password: String,
    role: String
  },
  {
    versionKey: false
  }
);
