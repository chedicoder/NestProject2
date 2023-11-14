import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../user/entities/user.enum';

//Création du décorateur


//Le décorateur est un metadata qui est composé par:
// 'Key' (Le nom de métadata):Valeurs de metadata
//Le metadata peut etre accessible dans toute l'application
//Le metadata nous aide pour stocker des valeurs dans lui meme
//Le stockage se fait par @nom de decorateur(les valeurs à stocker)

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

//export const nom de decorateur à appeler avec @=(...ce_q'on va stocker :type de ces donnees[])=> SetMetadata('key', ce q'on va stocker)
//ce qu'on va stocker est librement choisie par nous qui est generalement le key en miniscules

//export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
//export const Roles = (...roles: number[]) => SetMetadata('roles', roles);
//export const Roles = (...roles: any[]) => SetMetadata('roles', roles);



