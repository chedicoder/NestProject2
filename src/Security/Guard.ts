import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../user/entities/user.enum';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // importer les valeurs stockés dans le metadata de cle 'roles' vers le variable roles  
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>('roles', [context.getHandler(), context.getClass()]);
   //L'accés aux valeurs stockées
   //all : [ [ 'admin' ], [ 'user' ] ]
   //getAllAndMerge : [ 'admin', 'user' ]
   //getAllAndOverride : [ 'admin' ] : : retourne la première valeur qui n’est pas undefined
    
    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.role?.split(',')?.map(role => role.trim().toLowerCase()); // Convert to lowercase
    console.log(userRoles);
    return this.validateRoles(roles.map(role => role.toLowerCase()), userRoles);
  }

  validateRoles(roles: string[], userRoles: string[]) {
    return roles.some(role => userRoles.includes(role));
  }
}

/*
context: ExecutionContext
context.getHandler(): Renvoie la méthode du contrôleur qui gère la requête actuelle.

context.getClass(): Renvoie la classe du contrôleur qui gère la requête actuelle.

context.getArgs(): Renvoie les arguments passés à la méthode du contrôleur.

context.switchToHttp(): Fournit un accès direct à l'objet Request et à l'objet Response si la requête est gérée par HTTP.
context.switchToHttp().getRequest()
context.switchToHttp().getResponse()

context.getType(): Renvoie le type de contexte, par exemple, 'http' pour les requêtes HTTP.
context.switchToHttp().getNext():signifie obtenir la prochaine étape ou le prochain
middleware dans le pipeline de traitement de la requête
*/


// Methode 2

//Récupérer l'utilisateur à partir de la requête

    //extraction du token d'après la requete
    /*const token = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];;
    const decodedToken = await this.jwtService.verifyAsync(token);
    const user = await this.UserRepository.findOne({ where: { username:decodedToken.username} });
    // Vérifier si l'utilisateur a le rôle d'administrateur
    if ( (user && user.role === RoleEnum.admin )) {
        console.log(roles)
      return true; // L'utilisateur a le rôle d'administrateur
    }

    throw new UnauthorizedException("Tu n'as pas le droit d'accéder");
  }*/
