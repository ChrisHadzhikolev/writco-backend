import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [],
      inject: [],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '10000s',
        },
      }),
    }),
  ],
  providers: [JwtAuthGuard, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
