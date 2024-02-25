import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBosses() {
    return this.prismaService.boss.findMany();
  }

  async getAllUser() {
    return this.prismaService.user.findMany();
  }
}
