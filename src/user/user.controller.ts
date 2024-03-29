import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@UseGuards(AuthGuard())
@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @UsePipes(ValidationPipe)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async create(
    @Body() userDto: UserDTO,
  ) {
    try {
      console.log(userDto);
      const user = await this.userService.save(userDto);

      return user;
    } catch (error) {
      throw new HttpException('Algo Deu Errado! Contate o Suporte!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  public async update(
    @Body() userDto: UserDTO
  ): Promise<string> {
    try {
      const user = await this.userService.save(userDto);

      return user;
    } catch (error) {
      throw new HttpException('Algo Deu Errado! Contate o Suporte!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async getAll(): Promise<User[]> {
    try {
      const users = await this.userService.getAll();
      return users;
    } catch (error) {
      throw new HttpException('Algo Deu Errado! Contate o Suporte!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deletedUser = await this.userService.delete(id);
      return deletedUser;
    } catch (error) {
      throw new HttpException('Algo Deu Errado! Contate o Suporte!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}