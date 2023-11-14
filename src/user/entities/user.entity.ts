import { Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn } from 'typeorm';
import { CV } from '../../cv/entities/cv.entity';
import { RoleEnum } from './user.enum';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
// Si on fait un update pour un objet de cette entite elle sera incremente +1
  @VersionColumn()
  version: number;

  //RoleEnum.admin :on met la valeur qui est à gauche dans la classe enumerated
  //La valeur à gauche est pris en considération
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.user })
  role: RoleEnum;

  @OneToMany(() => CV, cv => cv.user)
  cvs: CV[];
  
}
