import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BooksEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ErrorException } from '../exceptions/error.exception';

describe('BooksService', () => {
	let service: BooksService;
	let repository: Repository<BooksEntity>;

	const mockRepository = {
		find: jest.fn(),
		findOne: jest.fn(),
		save: jest.fn(),
		count: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				BooksService,
				{
					provide: getRepositoryToken(BooksEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<BooksService>(BooksService);
		repository = module.get<Repository<BooksEntity>>(getRepositoryToken(BooksEntity));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should successfully insert a book', async () => {
			const createBookDto = { name: 'Test Book', author: 'Test Author', description: 'Test Description' };
			const result = { id: 'a-uuid', ...createBookDto, createDate: new Date(), updateDate: new Date() };

			jest.spyOn(repository, 'save').mockResolvedValue(result);

			expect(await service.create(createBookDto)).toEqual({ responseData: result });
			expect(repository.save).toHaveBeenCalledWith({
				...createBookDto,
				id: expect.any(String),
				createDate: expect.any(Date),
				updateDate: expect.any(Date),
			});
		});
	});

	describe('findAll', () => {
		it('should return an array of books with the total number of books', async () => {
			const bookEntitiesArray = [
				{ id: '1', name: 'Test Book 1', author: 'Test Author 1', description: 'Test Description 1', createDate: new Date(), updateDate: new Date() },
				{ id: '2', name: 'Test Book 2', author: 'Test Author 2', description: 'Test Description 2', createDate: new Date(), updateDate: new Date() },
			];
			const totalNumber = bookEntitiesArray.length;

			jest.spyOn(repository, 'find').mockResolvedValue(bookEntitiesArray);
			jest.spyOn(repository, 'count').mockResolvedValue(totalNumber);

			const result = await service.findAll();

			expect(result).toEqual({ total: totalNumber, responseData: bookEntitiesArray });
			expect(repository.find).toHaveBeenCalled();
			expect(repository.count).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should return a single book entity if found', async () => {
			const bookEntity = {
				id: '1',
				name: 'Test Book',
				author: 'Test Author',
				description: 'Test Description',
				createDate: new Date(),
				updateDate: new Date()
			};

			jest.spyOn(repository, 'findOne').mockResolvedValue(bookEntity);

			const result = await service.findOne('1');
			expect(result).toEqual({ responseData: bookEntity });
			expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
		});

		it('should throw a NotFoundException if no book is found', async () => {
			jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

			await expect(service.findOne('unknown-id')).rejects.toThrow(NotFoundException);
			expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'unknown-id' } });
		});
	});

	describe('update', () => {
		it('should update and return the book if found', async () => {
			const bookId = '1';
			const updateBookDto = { name: 'Updated Book' };
			const existingBook = new BooksEntity();
			Object.assign(existingBook, { id: bookId, name: 'Old Book', createDate: new Date(), updateDate: new Date() });

			jest.spyOn(repository, 'findOne').mockResolvedValue(existingBook);
			jest.spyOn(repository, 'save').mockImplementation(async (book: BooksEntity) => book);

			const result = await service.update(bookId, updateBookDto);
			expect(result).toEqual({ responseData: { ...existingBook, ...updateBookDto } });
			expect(repository.findOne).toHaveBeenCalledWith({ where: { id: bookId } });
			expect(repository.save).toHaveBeenCalledWith({ ...existingBook, ...updateBookDto, updateDate: expect.any(Date) });
		});

		it('should throw a ErrorException if no book is found', async () => {
			const bookId = 'unknown-id';
			jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

			await expect(service.update(bookId, { name: 'Updated Book' })).rejects.toThrow(ErrorException);
			expect(repository.findOne).toHaveBeenCalledWith({ where: { id: bookId } });
		});
	});

	describe('remove', () => {
		it('should successfully remove a book if found', async () => {
			const bookId = 'existing-id';
			const mockBook = { id: '1', name: 'Test Book 1', author: 'Test Author 1', description: 'Test Description 1', createDate: new Date(), updateDate: new Date() };
			jest.spyOn(repository, 'findOne').mockResolvedValue(mockBook);
			jest.spyOn(repository, 'remove').mockResolvedValue(null);

			await service.remove(bookId);

			expect(repository.remove).toHaveBeenCalledWith(mockBook);
		});

		it('should throw a NotFoundException if no book is found for removal', async () => {
			const bookId = 'non-existent-id';
			jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

			await expect(service.remove(bookId)).rejects.toThrow(NotFoundException);
		});
	});



});

