import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/orm'
import { UserSeeder } from "./user/user.seeder";
import { UserRepository } from "./user/user.repository";
import { ProductRepository } from "./product/product.repository";
import { ProductSeeder } from "./product/product.seeder";

seeder({
  imports: [ 
    TypeOrmModule.forRoot(configService.getTypeOrmData()),
    TypeOrmModule.forFeature([UserRepository, ProductRepository]),
  ],
}).run([UserSeeder, ProductSeeder]);