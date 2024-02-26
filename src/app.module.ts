import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { BossModule } from './boss/boss.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [AdminModule, BossModule, AuthModule, DatabaseModule, TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
