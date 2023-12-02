import { Controller,Query, Get, Post, Body, Param, Delete,UseGuards,Version, Patch } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { Roles } from '../Security/roles.decorator';
import { AdminGuard } from '../Security/Guard';
import { RoleEnum } from '../user/entities/user.enum';
import { CV } from './entities/cv.entity';
import { UpdateCvDto } from './dto/update-cv.dto';


@Controller
  ({ 
    path: 'cv',
    //version: '1',// http://localhost:3000/v1/cv/ pour acceder a ce controller
    })

//@UseGuards(AdminGuard) pour utiliser le guard dans tous les méthodes de controller
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
//Dans l'appel :
//@decorateur(les valeurs à stocker dans le metadata )
//@Roles('admin', 'user') 
//@Roles('admin')
  @UseGuards(AdminGuard)
  @Roles(RoleEnum.admin) //Guard est applicable seulement sur cette méthode
  findAll() {
    return this.cvService.findAll();
  }


// route version 1 de meme path GET (:id)
//on l'accede par GET http://localhost:3000/v1/cv/1
  @Get(':id')
  @Version('1')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }
//route version 2 de meme path GET (:id)
//on l'accede par GET http://localhost:3000/v2/cv/1
  @Get(':id')
  @Version('2')
  getTodos(@Param('id') id: string) {
    return 'v2';
  }

 


@Patch()
async updateCv( @Body() cv: UpdateCvDto): Promise<CV | null> {
  return this.cvService.updateCv( cv);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
  @Delete(':id')
  softremove(@Param('id') id: string) {
    return this.cvService.softremove(+id);
  }
  @Post(':userId/:cvId/adduser')
  async addUserToCv(@Param('userId') userId: number, @Param('cvId') cvId: number) {
    return this.cvService.addUserToCv(userId, cvId);
  }

  @Delete(':userId/:cvId/deletecv')
  async deleteCvFromUser(@Param('userId') userId: number, @Param('cvId') cvId: number) {
    return this.cvService.deleteCvfromUser(userId, cvId);
  }

  @Post('/affiche')
  affiche(){
  return this.cvService.show();
}
@Get('/affiche2/:cvId')//http://localhost:3000/cv/affiche2?param=chedi
//query contient la valeur passée au param dans le uri  
//on passe les parametres avant le query ?
//http://localhost:3000/cv/affiche2/1?param=chedi45
//http://localhost:3000/cv/affiche2/1?param1=chedi45&param2=chedi
affiche2(@Param('cvId') cvId: number,@Query('param1') query1: string,@Query('param2') query2: string) {
  console.log(cvId);
  this.cvService.show2(query2);
  return this.cvService.show2(query1);
}

@Get('/all')
findAll2() {
  return this.cvService.getCVs();
}
@Get('/all2/:id')
findAll3(@Param('id')id:number) {
  return this.cvService.getCVs2(id);
}


}
