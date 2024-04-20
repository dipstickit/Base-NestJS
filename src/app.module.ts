import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { DatabaseModule } from './database/database.module';
import { typeOrmAsyncConfig } from './database/datasource.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.local.env',
      // envFilePath: '.prod.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ScheduleModule.forRoot(),
    UserModule,
    CommentModule,
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
