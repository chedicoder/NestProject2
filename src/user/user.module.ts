import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CvModule } from '../cv/cv.module';
import { forwardRef } from '@nestjs/common';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(() => CvModule)],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService],
  
})
export class UserModule {}
