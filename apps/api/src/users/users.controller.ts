import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() body: CreateUserDto) {
    return body;
  }
}
