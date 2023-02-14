import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Module({
  imports: [MikroOrmModule.forFeature([BookingEntity])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
