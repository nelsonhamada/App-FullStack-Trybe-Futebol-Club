import SequelizeUser from '../database/models/SequelizeModel';
import { IUser, IUserModel } from '../Interfaces/iUser';

export default class UserModel implements IUserModel {
  public model = SequelizeUser;

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: { email },
    });
    return user;
  }
}
