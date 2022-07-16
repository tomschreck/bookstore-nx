import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('books-read-only')
export class BookReadOnlyEntity extends BaseEntity
{
  @Column('uuid')
  @PrimaryColumn()
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
}
