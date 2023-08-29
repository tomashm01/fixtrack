import { UserDTO } from '@fixtrack/contracts';
import mongoose, { Document, Schema } from 'mongoose';

export const USER_PROJECTION = 'users';

export type UserDocument = UserDTO & Document;

export const UserSchema = new Schema(
  {
    _id: String,
    email: String,
    password: String,
    role: String,
  },
  {
    versionKey: false,
  },
);

