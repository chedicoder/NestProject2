import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CvService } from '../cv/cv.service';
import * as ngneat from '@ngneat/falso';
import { CV } from '../cv/entities/cv.entity';

// Application autonome
// Pour lancer cette application autonome, ajoutez "seed:cvs": "ts-node src/commands/cv.seeder.ts" dans Package.json
// npm run seed:cvs
//revenir à tous les imports dans tous les classes et remplacer src/ par ../ ou ../../ 
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const cvService = app.get(CvService);

  // Génération de données aléatoires pour le CV
  const cvData = {
    name: ngneat.randUserName(),
    firstname: ngneat.randFirstName(),
    age: ngneat.randNumber({ min: 18, max: 30 }),
    //.join('') :Convertit le tableau de randSinger en une chaîne ""
    cin: ngneat.randSinger({ length: 8, type: 'numeric' }).join(''),
    job: ngneat.randJobTitle(),
    path: ngneat.randJobArea(),
  };

  // Création d'un nouvel objet CV
  const cv = new CV();

  cv.name = cvData.name;
  cv.firstname = cvData.firstname;
  cv.age = cvData.age;
  cv.cin = cvData.cin;
  cv.job = cvData.job;
  cv.path = cvData.path;
  

  ngneat.seed();

  // Ajout du CV fictif à la base de données
  await cvService.create(cv);

  await app.close();
}

bootstrap();
