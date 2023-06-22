import { Schema, Document } from 'mongoose';

export interface UserI extends Document {
  firstname: string;
  lastname: string;
  email: string;
}

export const UserSchema: Schema<UserI> = new Schema<UserI>({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
