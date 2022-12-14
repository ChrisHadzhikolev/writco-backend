import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entities/users.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '../models/user.dto';
import { IUser } from '../interface/IUser.interface';
import { Role } from '../../auth/enum/roles.enum';
import { AuthService } from '../../auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(user): Promise<UserDto> {
    const hashedPassword = await this.authService.hashSaltPassword(
      user.password,
    );

    const newUser = new User();
    newUser.id = uuidv4();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.role = Role.User;
    newUser.restricted = false;

    return this.userRepository.save(newUser).then((res) => {
      const { ...result } = res;
      return result;
    });
  }

  find(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async deleteOne(id: string): Promise<boolean> {
    await this.userRepository
      .delete(id)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

  async login(user: IUser): Promise<string> {
    const email = user.email;
    const userProfile = await this.userRepository.findOne({
      where: { email: email },
    });
    if (userProfile) {
      if (
        await this.authService.comparePasswords(
          user.password,
          userProfile.password,
        )
      ) {
        return await this.authService.generateJWT(userProfile);
      } else {
        return 'Wrong Credentials';
      }
    } else {
      return 'Wrong Credentials';
    }
  }

  findByMail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async updateRole(role: Role, id: string): Promise<boolean> {
    if (role == 'admin' || role == 'user') {
      const userProfile = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!userProfile) {
        return false;
      } else {
        userProfile.role = role;
        await this.userRepository.save(userProfile);
        return true;
      }
    }
  }

  // Typically it would send an email with notification to the user, but I don't have mail server
  async restrictUser(id: string): Promise<User> {
    if (id && id !== '') {
      const userProfile = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!userProfile) {
        return null;
      } else {
        userProfile.restricted = true;
        return await this.userRepository.save(userProfile);
      }
    } else {
      return null;
    }
  }

  async updateUserInfo(user: IUser, id: string): Promise<IUser> {
    const username = user.username;
    const userProfile = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!userProfile) {
      return null;
    }
    userProfile.firstName = user.firstName;
    userProfile.lastName = user.lastName;
    if (
      userProfile.username != username &&
      !(await this.userRepository.findOne({ where: { username: username } }))
    ) {
      userProfile.username = username;
    }
    return await this.userRepository.save(userProfile);
  }

  async updatePassword(
    password: string,
    oldPassword: string,
    id: string,
  ): Promise<boolean> {
    await this.userRepository
      .findOne({ where: { id: id } })
      .then(async (res) => {
        if (!res) {
          return false;
        }
        if (
          await this.authService.comparePasswords(oldPassword, res.password)
        ) {
          res.password = await this.authService.hashSaltPassword(password);
          await this.userRepository.save(res);
        }
        await this.userRepository.save(res);
      });
    return true;
  }
}
