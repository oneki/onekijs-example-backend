import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
  }), AuthModule, UsersModule, CartModule],
})
export class AppModule {}
