import { Identifiable } from '.';

export interface IUser extends Identifiable{
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserModel {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
}
