import { Role } from '../../auth/enum/roles.enum';

export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Role;
  restricted: boolean;
}
