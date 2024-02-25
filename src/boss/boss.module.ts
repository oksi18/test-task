import { Module } from '@nestjs/common';
import { BossService } from './boss.service';
import { BossController } from './boss.controller';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BossController],
  providers: [BossService, PrismaService],
})
export class BossModule {}
