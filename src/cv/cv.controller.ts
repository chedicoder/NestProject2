import { Controller, Get, Post, Body, Param, Delete,UseGuards } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { Roles } from '../Security/roles.decorator';
import { AdminGuard } from 'src/Security/Guard';
import { RoleEnum } from '../user/entities/user.enum';


@Controller('cv')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }
//chedi
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

}
