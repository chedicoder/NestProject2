import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import {  randFullName, randNumber, randSinger } from '@ngneat/falso';
import { CV } from '../cv/entities/cv.entity';

//application autonome

async function bootstrap() {
  //Lorsque vous créez une application autonome avec NestJS en utilisant la méthode
  // createApplicationContext, vous avez accès à tous les contrôleurs, services et 
  //dépendances de l'application "AppModule" à l'aide du get

  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);

  // Génération de données aléatoires pour le CV
  const cvData = { 
    name: randFullName(), 
    firstname: randFullName(),
    age: randNumber({ min: 18, max: 60 }),
    // .join('') :Convertit le tableau de randSinger en une chaîne ""
    cin: randSinger({ length: 8, type: 'numeric' }).join(''),
    job: randSinger({ length: 10, type: 'alpha' }).join(''),
    //alpha : les caractères générés seront des lettres de l'alphabet
    path: randSinger({ length: 10, type: 'alpha' }).join('')
  };

  // Création d'un nouvel objet CV
  const cv = new CV();

  cv.name = cvData.name;
  cv.firstname = cvData.firstname;
  cv.age = cvData.age;
  cv.cin = cvData.cin;
  cv.job = cvData.job;
  cv.path = cvData.path;

  // Ajout du CV fictif à la base de données
  await cvService.create(cv);

  await app.close();
}

bootstrap();
