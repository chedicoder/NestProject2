import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CV } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { SecurityModule } from '../Security/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Cv_v2 } from './cv2.controller';


@Module({
  imports: [TypeOrmModule.forFeature([CV]),
  TypeOrmModule.forFeature([User]),//pour injecter le repository de user
  UserModule,SkillModule,SecurityModule,
  JwtModule.register  //JwtModule.register pour fixer les propriétes du token
  ({
   //la clé secrète (secret) utilisée pour signer et vérifier les JSON Web Tokens (JWT)
   secret:process.env.SECRET,
   signOptions: {
     expiresIn: 3600, // La durée de validité du token en secondes
     algorithm:"HS512",

   },
 }),],
  controllers: [CvController,Cv_v2],
  providers: [CvService,UserService],

})
export class CvModule {}
