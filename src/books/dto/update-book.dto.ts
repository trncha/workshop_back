import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
	@IsOptional()
	name?: string;

	@IsOptional()
	author?: string;

	@IsOptional()
	description?: string;
}
