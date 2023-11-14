import { Module } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { SecurityController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),UserModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),


  //Le JwtModule offre le service JwtService
   JwtModule.register  //JwtModule.register pour fixer les propriétes du token
   ({
    //la clé secrète (secret) utilisée pour signer et vérifier les JSON Web Tokens (JWT)
    secret:process.env.SECRET,
    signOptions: {
      expiresIn: 3600, // La durée de validité du token en secondes
      algorithm:"HS512",

    },
  }),],
  controllers: [SecurityController],
  providers: [AuthService,JwtStrategy],
})
export class SecurityModule {}
