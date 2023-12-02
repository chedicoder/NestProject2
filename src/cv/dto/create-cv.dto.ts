import { IsOptional } from "class-validator";

export class CreateCvDto {
   
     @IsOptional()
     id:number;// Propriété id optionnelle(?)avec id?:number ou avec @IsOptional()
     name: string;
     firstname:string;
     age: number;
     cin: string;
     job: string; 
     path: string;
      
      
}
