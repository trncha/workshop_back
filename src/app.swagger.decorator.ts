import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const GetAppHelloSwagger = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Get Hello World' }),
        ApiResponse({ 
            status: 201, 
            description: 'Success'
        }),
        ApiResponse({ 
            status: 500, 
            description: 'QueryFailedError'
        }),
    );
}

export const GetAppSuccessSwagger = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Case Success' }),
        ApiResponse({ 
            status: 201, 
            description: 'Success'
        }),
        ApiResponse({ 
            status: 500, 
            description: 'QueryFailedError'
        }),
    );
}

export const GetAppErrorSwagger = () => {
    return applyDecorators(
        ApiOperation({ summary: 'Case Error' }),
        ApiResponse({ 
            status: 201, 
            description: 'Success'
        }),
        ApiResponse({ 
            status: 500, 
            description: 'QueryFailedError'
        }),
    );
}
