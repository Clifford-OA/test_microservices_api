import { EntityManager, RequestContext } from '@mikro-orm/core';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class DatabaseContextInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return new Observable((subscriber) => {
      let subscription: Subscription;

      RequestContext.create(
        this.moduleRef.get(EntityManager),
        () => (subscription = next.handle().subscribe(subscriber)),
      );

      return () => subscription.unsubscribe();
    });
  }
}