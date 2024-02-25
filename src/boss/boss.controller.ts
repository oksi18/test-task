import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BossService } from './boss.service';
import { CreateBossDto } from './dto/create-boss.dto';

@Controller('boss')
export class BossController {
  constructor(private readonly bossService: BossService) {}

  @Post('createBoss')
  async createBoss(@Body() createBossDto: CreateBossDto) {
    return this.bossService.createBoss(createBossDto);
  }

  @Put(':id/assignToBos/:userId')
  async assignUserToBoss(
    @Param('id') bossId: string,
    @Param('userId') userId: string,
  ) {
    return await this.bossService.assignToBoss(bossId, userId);
  }

  @Get('getBossById/:id')
  async getBossById(@Param('id') bossId: string) {
    return await this.bossService.getBossById(bossId);
  }

  @Get('getBossByUserId/:id')
  async getBossByUserId(@Param('id') userId: string) {
    return this.bossService.getBossByUserId(userId);
  }

  @Get('getAssignUserIdsForBoss/:id')
  async getAssignUserIdsForBoss(@Param('id') bossId: string) {
    return this.bossService.getAssignUserIdsForBoss(bossId);
  }

  @Delete(':id/removeUserFromBoss/:userId')
  async removeUserFromBoss(
    @Param('id') bossId: string,
    @Param('userId') userId: string,
  ) {
    return this.bossService.removeUserFromBoss(bossId, userId);
  }

  @Put(':userId/changeUserBoss/:newBossId')
  async changeUserBoss(
    @Param('userId') userId: string,
    @Param('newBossId') newBossId: string,
  ) {
    return this.bossService.changeUserBoss(userId, newBossId);
  }
}
