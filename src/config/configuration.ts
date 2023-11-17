
export default () => ({
  database: {
    name: process.env.DB_NAME || 'default_db_name',
    //Si est process.env.DB_NAME null alors on prend la valeur de 'default_db_name'
  },
});

//Pour accéder a ce fichier dans un module X different de appModule
/*
imports:[ConfigModule.forRoot({
load: [configuration],
}),]

//Pour accéder a ce fichier dans toute l'application càd globale on fait dans appModule
imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],

  configuration dans load est un nom choisie aléatoirement par nous, mais pour connaitre 
  quel est la configuration on met ca dans import {nom_choisie} from 'chemin de fichier
  de config'
  import devconfig from './config/configuration'; et on utilise après de config


Pour charger le fichier de configuration selon l'environnement de travail (production,developpement)
imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development'
            ? devConfiguration: prodConfiguration ou [] ],
    }),
  ],
Si le l'environnement est developement dans process.env.NODE_ENV on charge le fichier de
configuration devconfiguration sinon on charge le fichier prodconfiguration (ou on ne
 charge rien car on a mis [])


 Pour definir l'environnement de l'application on definit dans package.json
"start:dev": "cross-env NODE_ENV=development nest start --watch"
donc on lance  cet environnement avec npm run start:dev == nest start --watch
dans ce cas le variable NODE_ENV contient development et on charge le fichier de devconfig

"start:prod": "cross-env NODE_ENV=production node dist/main"
donc on lance  cet environnement avec npm run start:prod == node dist/main
dans ce cas le variable NODE_ENV contient production et on charge le fichier de prodconfig

nest start --watch est non modifiable elle est donnée par nestjs



L'acces aux variables stockés dans ces fichiers de configurations
dans le classe:
import { ConfigService } from '@nestjs/config';

constructor(private configService: ConfigService, ...) {}//si c'est un classe
const projectPort = this.configService.get('PROJECT_PORT', 3000);
PROJECT_PORT : est une variable stockée dans une fichier de configuration
3000 : si PROJECT_PORT est undefined on affecte 3000





*/
