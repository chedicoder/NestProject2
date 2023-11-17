import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UniqueFieldsPipe implements PipeTransform {
    constructor(
      @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
 async transform(value: any, metatype : ArgumentMetadata){
    //on extrait username et email à partir de structure json donnée "body"
    const { username, email } = value;

    const userByUsername = await this.userRepository.findOne({ where: { username } });
    if (userByUsername) {
      throw new BadRequestException('Username already exists');
    }

    const userByEmail = await this.userRepository.findOne({ where: { email } });
    if (userByEmail) {
      throw new Error('Email already exists');
    }

    return value;
  }
}
/*
Les messages d'erreur:

throw new 

BadRequestException : utilisée pour signaler des erreurs liées à une requête client mal formée ou incorrecte

NotFoundException: Utilisé pour signaler qu'une ressource spécifiée n'a pas été trouvée.

UnauthorizedException : Indique que l'utilisateur n'a pas l'autorisation d'accéder à la ressource demandée.

InternalServerErrorException : Indique une erreur interne du serveur, généralement quelque chose qui ne va pas du côté du serveur.

ValidationException : Utilisé pour signaler des erreurs de validation, généralement lorsque des données ne satisfont pas les critères spécifiés.

RequestTimeoutException : Indique que l'opération a expiré en raison d'un délai imparti dépassé.

+ ('message')
*/