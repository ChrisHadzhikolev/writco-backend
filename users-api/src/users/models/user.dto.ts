import { Role } from '../../auth/enum/roles.enum';

export class UserDto {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
  restricted: boolean;
}
