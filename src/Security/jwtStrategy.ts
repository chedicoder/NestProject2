import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/Login.dto'; 
import { User } from '../user/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( @InjectRepository(User)
  private UserRepository: Repository<User>) {
    super({
    //avec cette configuration, votre application s'attend à recevoir le JWT dans
    // l'en-tête Authorization de la requête HTTP avec le schéma Bearer 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // la valeur de la clé secrète sera lue à partir de
      // la variable d'environnement SECRET
      secretOrKey: process.env.SECRET,
    });
  }

  //valider le user à partir du token 
  //PayloadInterface est remplace par les donnees recus json
  /*async validate(payload: PayloadInterface, jwtPayload: any) {
    // Validez le JWT et retournez l'utilisateur s'il est trouvé
    const { username } = loginDto;
    const user = await this.UserRepository.findOne({ where: { username } });
    const token = jwtPayload.token; //extraction du token decodé
    if (!user) {
      throw new UnauthorizedException('user not valid');
    }
    return user;
  }*/
}
/*Authorization:est un champs de l'en-tête de la requéte http
Utiliser Barear signifie que le token se trouve dans authorisation de cette manière
Authorization: 'Bearer <votre-jwt>' est une chaine et utiliser .split(' ')[1] 
pour extriare le token
*/