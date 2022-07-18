import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('wishlist')
export class WishlistEntity extends BaseEntity
{
  @PrimaryColumn('uuid')
  userid: string;

  @Column("text", { array: true, default: [] })
  bookList: string[];
}
