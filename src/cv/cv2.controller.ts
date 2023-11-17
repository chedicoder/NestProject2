import { Controller, Get, Post, Body, Param, Delete,UseGuards,Version } from '@nestjs/common';

@Controller
    ({
        path: 'cv',
        //version: '2',// http://localhost:3000/v2/cv/ :pour acceder a ce controller version2
        })
export class Cv_v2{
@Get('')
ecrire()
{
return 'ahla chedi';

}


} 