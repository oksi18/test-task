import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      secret: 'oksi',
      expiresIn: '1h',
    });
  }
  decodeJwtToken(token) {
    return this.jwtService.decode(token.replace('Bearer ', ''));
  }
}
