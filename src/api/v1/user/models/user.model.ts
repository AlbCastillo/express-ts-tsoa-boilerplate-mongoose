import { model } from 'mongoose';

import { UserI, UserSchema } from './user.schema';

export default model<UserI>('User', UserSchema);
