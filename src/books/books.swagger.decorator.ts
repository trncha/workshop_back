import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

export const CreateBookSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Create Book' }),
		ApiBody({ type: CreateBookDto }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const FindAllBookSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'FindAll Book' }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const FindOneBookSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'FindOne Book' }),
		ApiParam({ name: 'id', required: true }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Book Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const UpdateBookSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Update Book' }),
		ApiParam({ name: 'id', required: true }),
		ApiBody({ type: UpdateBookDto }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Book Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}

export const DeleteBookSwagger = () => {
	return applyDecorators(
		ApiOperation({ summary: 'Delete Book' }),
		ApiParam({ name: 'id', required: true }),
		ApiResponse({ status: 201, description: 'Success' }),
		ApiResponse({ status: 404, description: 'Error Book Not Found!' }),
		ApiResponse({ status: 500, description: 'QueryFailedError' })
	);
}
