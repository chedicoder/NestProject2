import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial,Brackets, Like, MoreThan, Repository } from 'typeorm';
import { CV } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';
import { promises } from 'dns';
import { UpdateCvDto } from './dto/update-cv.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CV)
    private cvRepository: Repository<CV>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  create(createCvDto: CreateCvDto) {
    const cv = this.cvRepository.create(createCvDto);
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find();
  }
//{ where: { id: id1 } } == { where: { id } }
  findOne(id1: number) {
    return this.cvRepository.findOne({ where: { id:id1 } });
  }
 
/*
Preload :avec @Patch
preload charge l'entité ayant l'id dans objet passé
- Si l'entité avec l'ID spécifié n'existe pas dans la base de données, on va créer 
une nouvelle instance d'entité avec les valeurs spécifiées.
-  Si l'entité avec l'ID spécifié existe dans la base de données, on va mettre à 
jour cette instance avec les nouvelles valeurs spécifiées.
l'objet de type entité donné doit avoir un identifiant d'entité pour chercher cette 
entité


PUT est utilisé pour des mises à jour complètes, remplaçant toute la ressource, 
tandis que PATCH est utilisé pour des mises à jour partielles, appliquant uniquement 
les changements spécifiés.


*/

  async updateCv( cv :UpdateCvDto): Promise<CV | null> {
    try {
      
      const Entity = await this.cvRepository.preload({ ...cv });
      //...cv sont les valeurs de cv sous forme de tableau 
      if (!Entity) {
        return this.cvRepository.save(cv);
      }else{
      return this.cvRepository.save(Entity);
      }
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour en base de données:', error);
      throw error;
    }
  }




  remove(id: number) {
    return this.cvRepository.delete(id);
  }
  softremove(id: number) {
    return this.cvRepository.softDelete(id);
  }
  async addUserToCv(userId: number, cvId: number): Promise<CV> {
    const user = await this.UserRepository.findOne({ where: { id: userId } });
    const cv = await this.cvRepository.findOne({ where: { id: cvId } });
    cv.user=user;
    return this.cvRepository.save(cv);
  }
  async deleteCvfromUser(userId: number, cvId: number): Promise<CV> {
    const user = await this.UserRepository.findOne({ where: { id: userId } });
    const cv = await this.cvRepository.findOne({ where: { id: cvId } });
    cv.user=null;
    return this.cvRepository.save(cv);
  }
  show() {
    return process.env.Port ;
  }
  show2(ch: string): string {
    console.log(ch);
    return ch;
  }

  async getCVs() {
    //.query fait une requete SQL 
    return await this.cvRepository.query("SELECT * FROM cv");
    }

  
    async getCVs2(id:number) {
      return this.cvRepository.createQueryBuilder('cv') //eq select * from cv


        //.where('cv.age > 20')// {l'attribut dans l'entité :param}
        //equivalent à
        .andWhere({ age: MoreThan('20') })
        // .andWhere({name: Like("%Yuko%")})
        //.andWhere('cv.name LIKE :name', { name: '%${description}%' });

        /* .andWhere(
           "cv.path IN (:...paths)",
           {
           paths: ['Marketing','Accountability']
           })*/
        //orderBy : Utilisée pour spécifier l'ordre de tri des résultats(DESC,ASC)selon une colonne
        .orderBy('cv.age', 'ASC')
        .leftJoinAndSelect('cv.user', 'user') //on joint cv à user,on peut faire cv.user.username==user.username
        //on peut accéder directement user.username après la jointure
        .groupBy(' cv.id') //la premiere colonne affichées est 'id' qui est dans .groupBy
        .select([
          "cv.id", "cv.name", "cv.firstname", "cv.path", "cv.age", "count(cv.age) as count_age"
        ])
        // .take(4) //on prend 4 éléments à partir des éléments trouvés
        //.skip(0) //skip(n) ignore les n+1 prmiers lignes trouvés 
        .having('count_age>0') //filtre les resultats selon les COUNT, SUM, AVG réalisés avant

        //.getCount() compte les résultats
        .andWhere(
          new Brackets((qb) => {//création du bloc de condition
            qb.where('cv.id > 3').orWhere('user.createdAt < :date', { date: new Date('2020-06-10') });
          })
        )
            .getRawMany();
      //.getRawMany()
      //obtenir des données brutes, on utilise getRawOne et getRawMany id=>cv_id au lieu
      //de getMany ou getOne si on va afficher des colonnes differents des colonnes de l'entité (count)
      //getMany : Pour récupérer des entité on utilise la méthode getMany()
      //getOne():Pour récupérer une entité (la première) on utilise la méthode getOne().
      //il faut utiliser getOne ou getMany pour afficher les entités

      ;
      }
}
