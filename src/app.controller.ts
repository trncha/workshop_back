import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { GetAppSuccessSwagger, GetAppErrorSwagger, GetAppHelloSwagger } from './app.swagger.decorator';
import { IResponse } from './shared/interfaces/shared.interface';

@ApiTags('App Service')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	// @Get('/get-helloworld')
	// @GetAppHelloSwagger()
	// getHello(): IResponse {
	// 	return this.appService.getHello();
	// }

	// @Get('/get-success')
	// @GetAppSuccessSwagger()
	// getSuccess(): IResponse {
	// 	return this.appService.getSuccess();
	// }

	// @Get('/get-error')
	// @GetAppErrorSwagger()
	// getError(): IResponse {
	// 	return this.appService.getError();
	// }
}
