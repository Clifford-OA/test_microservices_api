import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { BookingEntity } from './booking.entity';
import { CreateBookingPayload } from './dtos';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: EntityRepository<BookingEntity>,
  ) {}

  getBookings(): any {
    return this.bookingRepository.findAll();
  }

  async getBookById(bookId: number) {
    const post = await this.bookingRepository.findOne({ bookId });
    if (post) return post;
    else throw new Error('Not available');
  }

  async createBooking(bookPayload: CreateBookingPayload) {
    const newPost = await this.bookingRepository.create(bookPayload);
    await this.bookingRepository.persistAndFlush(newPost);
    return newPost;
  }
}
