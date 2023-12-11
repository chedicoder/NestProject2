import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CvService } from './cv/cv.service';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { VersioningType } from '@nestjs/common';
import { rejects } from 'assert';
import { error } from 'console';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
  //let pour declarer une variable
  //const pour declarer une constante inchangeable
  let t :any[];//t est un tableau de type any
  t=await cvService.findAll();
  console.log(c);
  const configService=app.get(ConfigService);
  console.log(configService.get('database.name'));
  //export :pour pouvoir importer cette valeur ou class dans un autre fichier*/
 
//Créer une fonction localement
//()=>est utilisé si on doit fournir une fonction sans avoir le créer avant 
/*
switchMap prend une fonction
switchMap(() => {
  return this.http.get<any>(apiUrl);
})*/
/*
function get():Promise<number>{
const myPromise = new Promise<number>((resolve, reject) => {
  let a = 5;
  a=a+1;

  Promise.resolve(a)
    .then((a) => {
      const b = a * 10;
      return b;
    })
    .then((m) => {
      if (m < 5) {
        reject(new Error("C'est une erreur"));
      }
       else {
       // console.log(m);
        resolve(m);
        
      }
    });
   });
   myPromise.then((b)=>{
  //console.log(b);
 }); 
  return myPromise;//myPromise est une promesse contenat la derniere valeur par resolve
 }
 function affiche() {
  let a: any;

  get()
    .then((result) => {
      console.log(result);
      a = result;
      console.log("c\'est " + (a ));
    })
    .catch((error) => {
      console.error(error.message);
      throw error; 
    });
}

affiche();
*/



/*

La promesse gére les opérations asynchrones et le succés ou l'échec d'une opération
avec resolve et reject,la promesse stocke une seule valeur à la fin avec .resolve(value)
Dans une fonction asynchrone on utilise resolve en cas de succés et reject en cas d'erreur

// Pour const A = await B;
Pour const C = await D;
... des lignes ne contanant pas await
await E;
... des lignes ne contanant pas await
const myPromise = new Promise((resolve, reject) => {
        B
        Promise.resolve(A)
        .then((A) => {
            return D;
        })
        .then((C) => {
          ... des lignes ne contanant pas await
            return E;
        })
        .then(() => {
            // Dans le dernier bloc then
            //...
            //les autres lignes ne contenant pas await
            if (A == null) rejects(new error('Not existing'));
            resolve(user);//c'est la dérnière valeur stockée dans le promesse grace à resolve
        })
        .catch((error) => reject(error)); // pour le bloc then précédent
});
//myPromise contient la dernière valeur resolue du promesse
return myPromise;



//Pour utiliser la valeur stocké dans la promesse dans un autre emplacement
myPromise
    .then((result) => {
      //utiliser la valeur resolue par le promesse

      
    })
    .catch((error) => {
        // Gérer les erreurs ici
        console.error('Erreur:', error);
    });

*/
/*
Les observables sont utilisés car:
les crud et leurs reponses doivent etre dans le services 
les modifications apportés comme ajout delete update de la base de données ne sont pas 
propagés dans les autres components qui ont acces au meme données en meme temps


*/
/*
//L'observable stocke plusieurs valeurs grace à .next
const myobservable: Observable<number> = new Observable(observer => {
  let b:number;
  b=1;
  observer.next(b);
  b = 5; 
  observer.next(b);//on stocke les deux valeurs de b 1 et 5
  observer.complete();//l'observable ne peut plus stocker des valeurs (différent au promesse)
});
const subscription = myobservable
.pipe(
  filter((value: number) => value > 0), // Filtrer les valeurs supérieures à 0
  map(value => value * 2)     // Mapper chaque valeur en la multipliant par 2
  //tab.map(value => value * 2) .map est appliqué sur les données pour changer leurs valeurs
)  
 .subscribe({
  next: value => console.log('Next:', value),
  error: error => console.error('Error:', error),
  complete: () => console.log('Complete')
});
subscription.unsubscribe();// libérer les ressources de next
*/
  await app.listen(3000);
}
bootstrap();


