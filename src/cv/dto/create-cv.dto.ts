import { IsOptional } from "class-validator";

export class CreateCvDto {
   
     @IsOptional()
     id:number;
     name: string;
     firstname:string;
     age: number;
     cin: string;
     job: string; 
     path: string;
      
      
}
