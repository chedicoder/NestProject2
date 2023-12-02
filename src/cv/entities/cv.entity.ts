import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

@Entity() 
export class CV {
//@PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(
    () => User,
    (user: User) => user.cvs,
    
    )
    user: User;

  @ManyToMany(() => Skill)
  @JoinTable({
    name: "cv_skills", // nom de la table à générer
    joinColumn: {
      name: "cv_id", // nom du champ représentant l'entité actuelle
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "skill_id", // nom du champ représentant l'entité en relation avec cet entité
      referencedColumnName: "id"
    }
  })
  skills: Skill[];
  
}
