import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CV } from 'src/cv/entities/cv.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  designation: string;

  @ManyToMany(() => CV, cv => cv.skills)
  cvs: CV[];
}
