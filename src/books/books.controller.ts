import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookSwagger, DeleteBookSwagger, FindAllBookSwagger, FindOneBookSwagger, UpdateBookSwagger } from './books.swagger.decorator';

@ApiTags('Books Service')
@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	@Post()
	@CreateBookSwagger()
	async create(@Body() createBookDto: CreateBookDto) {
		return await this.booksService.create(createBookDto);
	}

	@Get()
	@FindAllBookSwagger()
	async findAll() {
		return await this.booksService.findAll();
	}

	@Get(':id')
	@FindOneBookSwagger()
	async findOne(@Param('id') id: string) {
		return await this.booksService.findOne(id);
	}

	@Patch(':id')
	@UpdateBookSwagger()
	async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
		return await this.booksService.update(id, updateBookDto);
	}

	@Delete(':id')
	@DeleteBookSwagger()
	async remove(@Param('id') id: string) {
		return await this.booksService.remove(id);
	}
}
