import { Document, Schema, Model, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuid } from 'uuid';

/**
 * MONGOOSE USER INTERFACE
 */
export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  admin: boolean;
}

/**
 * MONGOOSE USER SCHEMA
 */
export const UserSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => uuid(),
    },
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
      unique: true,
      required: true,
    },
    admin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
UserSchema.plugin(uniqueValidator);

/**
 * MOONGOSE USER MODEL
 */
export const UserModel: Model<IUser> = model('User', UserSchema);
