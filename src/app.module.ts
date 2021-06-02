import { Module } from '@nestjs/common';
import { configService } from './config/orm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { RolesModule } from './roles/role.module';

@Module({
  imports: [ TypeOrmModule.forRoot(configService.getTypeOrmData()), UserModule, AuthModule, ProductModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

