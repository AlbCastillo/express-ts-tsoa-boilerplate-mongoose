import { model } from 'mongoose';

import { UserI, UserSchema } from './users.schema';

export default model<UserI>('User', UserSchema);
