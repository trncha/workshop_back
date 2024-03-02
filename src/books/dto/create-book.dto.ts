import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '' })
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '' })
	author: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({ default: '' })
	description: string;
}
