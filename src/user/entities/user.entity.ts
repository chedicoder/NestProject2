import { Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { CV } from '../../cv/entities/cv.entity';
import { RoleEnum } from './user.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true,
          nullable:false,
          length:15,
          update:true,
          name:'username',
          select: true // Cette colonne sera incluse par défaut dans les résultats des requêtes
          //false cette colonne ne va pas etre affiche dans les find obtenues par les requetes
        })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
   updatedAt: Date;

 @DeleteDateColumn()
  deletedAt: Date;  


// Si on fait un update pour un objet de cette entite elle sera incremente +1
  @VersionColumn()
  version: number;

  //RoleEnum.admin :on met la valeur qui est à gauche dans la classe enumerated
  //La valeur à gauche est pris en considération
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.user })
  role: RoleEnum;

  @OneToMany(() => CV, cv => cv.user,
  //{ cascade: ['insert', 'update','remove' ] }
  /*
user ---- cv  
cascade pour le insert s'il ya des cvs nouvellement crées et non existants dans le bd
puis on les affecte au user ,ces cvs seront crées et stockées dans la bd 
pour le remove si le user est supprimées tous ses cvs seront supprimées de la bd
   */
  
/*
{onDelete: "RESTRICT" | "CASCADE" | "SET NULL"} 
"RESTRICT" on ne peut pas supprimer l'objet si cet objets a des cles etrangers non nuls
"CASCADE" on supprime les objets associes si cet objet est supprimé
"SET NULL" les clés etrangers des objets asscocies a cet objet seront null si cet objet
est supprimé 


*/



)
  cvs: CV[];
  /*
  Eager Loading:eager: true
  dans les requétes de find les cv sont affichées lorsqu'on affiche un ou les users
  {
    'id':1,
    'name':'chedi',
    'cvs':[]
  }
  Lazy Loading :eager:false
  dans les requétes de find les cv ne sont pas affichées mais on les accéde par user.cvs
  {
    'id':1,
    'name':'chedi'
  }
  
  */
  
}
