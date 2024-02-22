import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';

@Module({
  imports: [PassportModule, JwtModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, TokenService],
})
export class AuthModule {}
