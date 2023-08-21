import { singleton } from 'tsyringe';

import { CreateUserDto } from './dto/create-user.dto';
import userModel from './models/user.model';
import { UserI } from './models/user.schema';
import { ApiError } from '../../../middlewares/api.errors';
import { HTTP_ERRORS } from '../../../utils/http.errors';

@singleton()
export class UserService {
  async create(user: CreateUserDto): Promise<UserI> {
    try {
      return await userModel.create(user);
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error creating user!');
    }
  }
  async remove(id: string): Promise<UserI> {
    try {
      const user = await userModel.findOneAndDelete({ _id: id });
      if (user) return user;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'User not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error deleting user!');
    }
  }

  async findOne(id: string): Promise<UserI> {
    try {
      const user = await userModel.findById(id);
      if (user) return user;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'User not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding user!');
    }
  }

  async findAll(): Promise<UserI[]> {
    try {
      return userModel.find();
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding users!');
    }
  }
}
