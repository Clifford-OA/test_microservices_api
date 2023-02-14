import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class BookingEntity {
  @PrimaryKey()
  bookId: number;

  @Property()
  name: string;

  @Property()
  tel: number;

  @Property()
  visitingHouseNo: string;
}
