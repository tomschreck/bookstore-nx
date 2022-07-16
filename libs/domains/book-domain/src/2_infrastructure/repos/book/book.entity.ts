import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class BookEntity extends BaseEntity
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  inventory: number;

  @Column({ nullable: true })
  notes: string;
}
