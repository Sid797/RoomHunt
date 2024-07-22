// interfaces/IUser.ts

import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'seller';
  createdAt: Date;
}
