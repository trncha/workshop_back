import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse } from './shared/interfaces/shared.interface';
import { ErrorException } from './exceptions/error.exception';

@Injectable()
export class AppService {
	// getHello(): IResponse {
	// 	return {
	// 		responseData: {
	// 			message: 'Hello World!'
	// 		}
	// 	};
	// }

	// getSuccess(): IResponse {
	// 	try {
	// 		return {
	// 			responseData: {
	// 				message: 'Success!'
	// 			}
	// 		};
	// 	} catch (error) {
	// 		throw new ErrorException(error);
	// 	}
	// }

	// getError(): IResponse {
	// 	try {
	// 		throw new NotFoundException();
	// 	} catch (error) {
	// 		throw new ErrorException(error);
	// 	}
	// }
}
