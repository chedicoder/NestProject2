import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { LoginDto } from './dto/Login.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UsePipes } from '@nestjs/common';
import { RegisterDto } from './dto/Register.dto';
import { UniqueFieldsPipe } from './dto/pipe';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';


@Controller('/auth')
@UsePipes(ValidationPipe)
export class SecurityController {
  constructor(private readonly authService: AuthService,
    @InjectRepository(User)
    private userRepository: Repository<User>
     ) {}

  @Post('/register')
  
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerUser(registerDto);
  }

  
  @Post('/login')
  async login(@Body() loginDto:LoginDto) {
    return this.authService.login(loginDto);
  }
}
