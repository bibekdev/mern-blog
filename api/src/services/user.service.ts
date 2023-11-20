import { IUserDocument } from '@/interfaces/user.interface'
import { UserModel } from '@/models/user.model'

class UserService {
  public async findByEmail(email: string): Promise<IUserDocument> {
    return UserModel.findOne({ email }) as unknown as IUserDocument
  }

  public async createUser(data: IUserDocument): Promise<IUserDocument> {
    const user: IUserDocument = await UserModel.create(data)
    return user as unknown as IUserDocument
  }
}

export const userService: UserService = new UserService()
