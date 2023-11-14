import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { RegisterDto } from './dto/Register.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/Login.dto';
import 'dotenv/config';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
  private UserRepository: Repository<User>,

//Le JwtService utilise le json web token. Il offre les fonctions suivantes :
//sign (payload: string): elle permet de générer le Token à partir du payload que vous lui passez.
//verify prend en paramètre un token et le vérifie.
//decode prend en paramètre un token et le décode.
  private readonly jwtService: JwtService
) {}
    
   async registerUser(registerdto:RegisterDto) {

    //Cryptage de password
    //le "salt" est en effet une chaîne aléatoirement 
    //générée par l'algorithme de hachage bcrypt

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(registerdto.password, salt);
  registerdto.password=hashedPassword;
  return this.UserRepository.save(registerdto);
  }


  async login(loginDto: LoginDto) {
    const user = await this.UserRepository.findOne({ where: { username: loginDto.username } });
    //loginDto.password est non crypte et user.password est crypté pour garantir la securité des password
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
  
      require("dotenv").config();//pour utiliser les variables de configuration dans .env
      const payload = { username: user.username, password: user.password }; 
      return {
        //Générer le token à partir du payload (usernamme et password) avec .sign
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }
  


}

