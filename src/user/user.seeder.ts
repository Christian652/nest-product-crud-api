import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { UserRepository } from "./user.repository";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) { }

  async seed(): Promise<any> {
    try {
      const rawadminpassword = 'admin';

      const adminsalt = await bcrypt.genSalt(10);
      const adminpassword = await bcrypt.hash(rawadminpassword, adminsalt);
    

      const rawcommonpassword = 'usuario';

      const commonsalt = await bcrypt.genSalt(10);
      const commonpassword = await bcrypt.hash(rawcommonpassword, commonsalt);
    
      return await this.userRepository.insertMany([
        {
          name: 'admin user',
          email: 'admin@gmail.com',
          role: Role.Admin,
          password: adminpassword,
        },
        {
          name: 'common user',
          email: 'usuario@gmail.com',
          role: Role.User,
          password: commonpassword,
        },
      ]);  
    } catch (error) {}
  }

  async drop(): Promise<any> {
    try {
      const user = await this.userRepository.find();
      await this.userRepository.remove(user);
    } catch (error) {}
  }
}