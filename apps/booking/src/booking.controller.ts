import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingPayload } from './dtos';

import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BookingController {
  // @MessagePattern('nothing')
  constructor(private readonly bookingService: BookingService) {}

  getBookings(): any {
    return this.bookingService.getBookings();
  }

  postBooking(@Body() payload: CreateBookingPayload): any {
    return this.bookingService.createBooking(payload);
  }
}
