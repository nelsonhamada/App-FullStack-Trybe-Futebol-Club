import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUserModel } from '../Interfaces/iUser';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(
    public userModel: IUserModel = new UserModel(),
  ) { }

  public async requestLogin(email: string, password: string) {
    const invalidMessage = 'Invalid email or password';

    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const token = jwt.sign({
      id: user.id,
      name: user.username,
      role: user.role,
    }, process.env.JWT_SECRET || 'padrao', {
      expiresIn: '7d',
    });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}

// Corrigir controller para retorno de token
// aplicar Middleware para verificações se existe request correto;
// aplicar verificação de senha encriptada
// Criar outra rota /login/role para verificar se token vem no header;
