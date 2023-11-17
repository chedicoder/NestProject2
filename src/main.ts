import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CvService } from './cv/cv.service';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

      //pour avoir plusieur controllers de meme path (3 controller avec '/api' )
       //pour avoir des meme paths routes dans un controller(3 GET('/user') )
       //Rq:on ne peut pas avoir les deux ensembles càd on ne peut pas avoir 2 controllers
       //de meme paths et un parmi les 2 a deux methodes de meme routes
       //on utilise une methode de versioning non plusieurs à la fois

     app.enableVersioning({//inclure la version dans le uri 
      type: VersioningType.URI
       });


       /*app.enableVersioning({ //Un header personnalisé permettra de spécifier la version
        type: VersioningType.HEADER,
        header: 'Your-Custom-Header',
        });



        app.enableVersioning({//L’Accept header de la requête spécifiera la version
          type: VersioningType.MEDIA_TYPE,
          key: 'v=',
          });*/



 /* console.log("ahla chedi");
  const cvService = app.get(CvService);
  const c=await cvService.findAll();
  let t :any[];//t est un tableau de type any
  t=await cvService.findAll();
  console.log(c);
  const configService=app.get(ConfigService);
  console.log(configService.get('database.name'));*/
  
  //let pour declarer une variable
  //const pour declarer une constante inchangeable
 //export :pour pouvoir importer cette valeur ou class dans un autre fichier
  await app.listen(3000);
}
bootstrap();
