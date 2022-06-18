import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { IdentityRequestModule } from '../identity-requests/identity-request.module';
import { JwtModule } from '@nestjs/jwt';
import { ApplicationConstants } from '../../ApplicationConstants';
import { UserJwtStrategy } from './user.jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    IdentityRequestModule,
    JwtModule.register({
      secret: ApplicationConstants.JWT_SECRET_USER,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserJwtStrategy],
  exports: [UserJwtStrategy],
})
export class UserModule {}
