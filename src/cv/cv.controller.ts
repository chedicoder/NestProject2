import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
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
}
