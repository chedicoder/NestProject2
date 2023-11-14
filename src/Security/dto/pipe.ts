import { Injectable, PipeTransform } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { ArgumentMetadata } from '@nestjs/common';


@Injectable()
export class UniqueFieldsPipe implements PipeTransform {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
 async transform(value: any, metatype : ArgumentMetadata){
    //on extrait username et email à partir de structure json donnée 
    const { username, email } = value;

    const userByUsername = await this.userRepository.findOne({ where: { username } });
    if (userByUsername) {
      throw new Error('Username already exists');
    }

    const userByEmail = await this.userRepository.findOne({ where: { email } });
    if (userByEmail) {
      throw new Error('Email already exists');
    }

    return value;
  }
}
