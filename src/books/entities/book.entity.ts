import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('books')
export class BooksEntity {
    @PrimaryColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name' })
    name: string;

	@Column({ name: 'author' })
    author: string;

    @Column({ name: 'description' })
    description: string;

	@Column({ name: 'create_date' })
    createDate: Date;

    @Column({ name: 'update_date', nullable: true })
    updateDate?: Date;
}
