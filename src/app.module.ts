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
import { ConfigModule } from '@nestjs/config';
import devconfiguration from './config/configuration';
import port from './config/port';

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
      logging: true,
      cache: {
        duration: 5000, //  en millisecondes
      },/*Si la meme requête est effectuée à nouveau et que les données de la base de 
        données n'ont pas changé, le cache (une unite de stockage)est utilisé pour
        fournir les résultats stockés précédemment sans avoir à exécuter la requête
        à nouveau contre la base de données. */
    
    }),
      ConfigModule.forRoot({
        isGlobal: true,
        load: [//devconfiguration, sans condition
          process.env.NODE_ENV == 'development'
          ?devconfiguration:port],
      }),
      /*
      Si on va utiliser des données stockés dans les fichiers de configuration dans un module
      comme le nom de base de données 

      TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
      //…Les autres configuration (type,port,...)

      database: configService.get('database.name'),
       }),
       inject: [ConfigService],
       }),
      
      */
 
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
