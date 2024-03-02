import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ErrorException } from '../exceptions/error.exception';

@Injectable()
export class BooksService {
	constructor(
		@InjectRepository(BooksEntity)
		private booksRepository: Repository<BooksEntity>,
	) { }

	async create(createBookDto: CreateBookDto) {
		const itemBook: BooksEntity = {
			...createBookDto,
			id: uuidv4(),
			createDate: new Date(),
			updateDate: new Date()
		};
		const responseData = await this.booksRepository.save(itemBook);
		return { responseData }
	}

	async findAll() {
		const responseData = await this.booksRepository.find({ order: { updateDate: 'DESC' } });
		const total = await this.booksRepository.count();

		return { total, responseData };
	}

	async findOne(id: string) {
		const responseData = await this.booksRepository.findOne({ where: { id } });
		if (!responseData) throw new NotFoundException(`Entity with bookId ${id} not found`);

		return { responseData };
	}

	async update(id: string, updateBookDto: UpdateBookDto) {
		try {

			const book = await this.booksRepository.findOne({ where: { id } });
			if (!book) throw new NotFoundException(`Entity with bookId ${id} not found`);

			book.updateDate = new Date();
			Object.assign(book, updateBookDto);

			const responseData = await this.booksRepository.save(book);
			return { responseData }

		} catch (error) {
			throw new ErrorException(error);
		}
	}

	async remove(id: string) {
		const book = await this.booksRepository.findOne({ where: { id } });
		if (!book) throw new NotFoundException(`Entity with bookId ${id} not found`);

		await this.booksRepository.remove(book);
	}
}
