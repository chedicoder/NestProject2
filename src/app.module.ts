import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { SkillModule } from './skill/skill.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [CvModule, UserModule, SkillModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '21081999',
      database: 'mynestproject2',
      synchronize: false, // Cela synchronisera automatiquement votre schéma de base de données avec vos entités. Ne l'utilisez pas en production.
      autoLoadEntities: true,
      logging: true,})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
