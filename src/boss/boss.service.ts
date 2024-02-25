import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateBossDto } from './dto/create-boss.dto';
import * as bcrypt from 'bcrypt';
import { Boss } from '@prisma/client';

@Injectable()
export class BossService {
  constructor(private readonly prismaService: PrismaService) {}
  async createBoss(createBossDto: CreateBossDto) {
    const hashedPassword = await bcrypt.hash(createBossDto.password, 10);
    try {
      await this.prismaService.boss.create({
        data: {
          name: createBossDto.name,
          email: createBossDto.email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      throw new ConflictException(e.message);
    }
    return HttpStatus.CREATED;
  }

  async getBossById(bossId: string) {
    return this.prismaService.boss.findUnique({
      where: { id: bossId },
    });
  }

  async assignToBoss(bossId: string, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { boss: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.boss !== null) {
      throw new Error('User already has a boss');
    }

    const boss = await this.prismaService.boss.findUnique({
      where: { id: bossId },
    });

    if (!boss) {
      throw new NotFoundException('Boss not found');
    }

    if (user.bossId !== null) {
      throw new Error('User already has a boss');
    }

    boss.assignUsersIds.push(userId);

    const updateUser = await this.prismaService.user.update({
      where: { id: userId },
      data: { bossId: bossId },
    });

    const updateBoss = await this.prismaService.boss.update({
      where: { id: bossId },
      data: { assignUsersIds: boss.assignUsersIds },
    });

    return { user: updateUser, boss: updateBoss };
  }

  async getBossByUserId(userId: string) {
    return this.prismaService.boss.findMany({
      where: {
        assignUsersIds: {
          has: userId,
        },
      },
    });
  }

  async getAssignUserIdsForBoss(bossId: string) {
    const boss = await this.prismaService.boss.findUnique({
      where: { id: bossId },
      select: { assignUsersIds: true },
    });

    if (!boss) {
      throw new NotFoundException('Boss not found');
    }

    return boss.assignUsersIds;
  }

  async removeUserFromBoss(bossId: string, userId: string) {
    const boss = await this.prismaService.boss.findUnique({
      where: { id: bossId },
      select: { assignUsersIds: true },
    });

    if (!boss) {
      throw new NotFoundException('Boss not found');
    }

    const updatedAssignUsersIds = boss.assignUsersIds.filter(
      (id) => id !== userId,
    );

    await this.prismaService.boss.update({
      where: { id: bossId },
      data: { assignUsersIds: updatedAssignUsersIds },
    });

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prismaService.user.update({
      where: { id: userId },
      data: { bossId: null },
    });
  }

  async changeUserBoss(userId: string, newBossId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newBoss = await this.prismaService.boss.findUnique({
      where: { id: newBossId },
    });
    if (!newBoss) {
      throw new NotFoundException('New boss not found');
    }
    await this.prismaService.user.update({
      where: { id: userId },
      data: { bossId: newBossId },
    });

    return { message: "User's boss updated successfully" };
  }
}
