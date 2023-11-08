import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { CV } from './entities/cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SkillModule } from 'src/skill/skill.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CV]),TypeOrmModule.forFeature([User]),UserModule,SkillModule],
  controllers: [CvController],
  providers: [CvService,UserService],
})
export class CvModule {}
