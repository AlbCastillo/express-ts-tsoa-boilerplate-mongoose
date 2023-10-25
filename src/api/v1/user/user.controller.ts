import { Route, Controller, Get, Path, Post, SuccessResponse, Body } from 'tsoa';
import { inject, injectable } from 'tsyringe';

import { CreateUserDto } from './dto/create-user.dto';
import { UserI } from './models/user.schema';
import { UserService } from './user.service';

@injectable()
@Route('v1/user')
export class UserController extends Controller {
  constructor(@inject(UserService) private usersService: UserService) {
    super();
  }

  @Get('/status')
  @SuccessResponse('200', 'OK')
  async healthcheck(): Promise<{ message: string }> {
    this.setStatus(200);
    return { message: 'User controller works!' };
  }

  @Get('/get/{userId}')
  @SuccessResponse('200', 'OK')
  async getUser(@Path() userId: string): Promise<UserI> {
    this.setStatus(200);
    return this.usersService.findOne(userId);
  }

  @Get('/users')
  @SuccessResponse('200', 'OK')
  async getUsers(): Promise<UserI[]> {
    this.setStatus(200);
    return this.usersService.findAll();
  }

  @Post()
  @SuccessResponse('201', 'Created')
  async createUser(@Body() user: CreateUserDto): Promise<UserI> {
    this.setStatus(201);
    return this.usersService.create(user);
  }

  @Post('/delete/{userId}')
  @SuccessResponse('200', 'OK')
  async deleteUser(@Path() userId: string): Promise<UserI> {
    this.setStatus(200);
    return this.usersService.remove(userId);
  }
}
