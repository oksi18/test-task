import { User } from '@prisma/client';

export class CreateBossDto {
  name: string;
  email: string;
  password: string;
}
