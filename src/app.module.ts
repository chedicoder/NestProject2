import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { CV } from './cv/entities/cv.entity';
import { Skill } from './skill/entities/skill.entity';
import { SecurityModule } from './Security/auth.module';

@Module({
  imports: [CvModule, UserModule, SkillModule,SecurityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '21081999',
      database: 'mynestproject2',
      synchronize: true, // Cela synchronisera automatiquement votre schéma de base de données avec vos entités. Ne l'utilisez pas en production.
      autoLoadEntities: true,
      entities: [User,CV,Skill],
      logging: true,}),
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
