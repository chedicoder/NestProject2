import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CV } from './entities/cv.entity';
import { User } from '../user/entities/user.entity';

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
    console.log();
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find();
  }
//{ where: { id: id1 } } == { where: { id } }
  findOne(id1: number) {
    return this.cvRepository.findOne({ where: { id:id1 } });
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
}
