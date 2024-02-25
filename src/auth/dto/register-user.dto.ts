import { Role } from '@prisma/client';

export class RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
}
