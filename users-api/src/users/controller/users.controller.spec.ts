import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from '../service/users.service';
import { User } from '../../database/entities/users.entity';
import { IUser } from '../interface/IUser.interface';

describe('UserController Integration', () => {
  let userController: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => []),
        login: jest.fn(() => []),
        findAllUsers: jest.fn(() => []),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        find: jest.fn(() => {}),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        updateUser: jest.fn(() => {}),
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        deleteOne: jest.fn(() => {}),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();
    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });
  it('should create new User', () => {
    const user = new User();
    user.username = 'test';
    user.firstName = 'Test';
    user.lastName = 'Test';
    user.email = 'test@test.test';
    user.password = 'testpass';
    expect(userController.create(user)).not.toEqual(null);
    expect(userService.create).toHaveBeenCalled();
    expect(userService.create).toHaveBeenCalledWith(user);
  });

  it('should login user', () => {
    expect(
      userController.login({
        email: 'test@test.test',
        password: 'testpass',
      } as IUser),
    ).not.toEqual(null);
    expect(userService.login).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalledWith({
      email: 'test@test.test',
      password: 'testpass',
    });
  });
  //
  // it('should get user by id', () => {
  //   expect(userController.findUser({ id: 'userid' })).not.toEqual(null);
  //   expect(userService.find).toHaveBeenCalled();
  //   expect(userService.find).toHaveBeenCalledWith('userid');
  // });
  //
  // it('should delete by id', () => {
  //   expect(userController.deleteOne('userid')).not.toEqual(null);
  //   expect(userService.deleteOne).toHaveBeenCalled();
  //   expect(userService.deleteOne).toHaveBeenCalledWith('userid');
  // });
});
