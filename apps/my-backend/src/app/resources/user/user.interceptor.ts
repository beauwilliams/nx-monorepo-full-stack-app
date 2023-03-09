import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlySameUserByIdAllowed implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const context_ = GqlExecutionContext.create(context);
    const { req } = context_.getContext();
    const requestedFromUserId = req.body?.variables?.args?.id;
    const requestedForUserId = req?.user?.id;
    try {
      if (requestedFromUserId === requestedForUserId) {
        return next.handle();
      } else {
        throw new Error('Unauthorized');
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
