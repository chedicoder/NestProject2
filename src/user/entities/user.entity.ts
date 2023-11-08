import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CV } from 'src/cv/entities/cv.entity';

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

  @OneToMany(() => CV, cv => cv.user)
  cvs: CV[];
  
}
