import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { TransformInterceptor } from './interceptors/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { BooksModule } from './books/books.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		BooksModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor,
		},
		AppService
	],
})
export class AppModule { }
