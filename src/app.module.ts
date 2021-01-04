import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CatsModule } from './api/cats/cats.module';
import { AllExceptionFilter } from './all.exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { GeneralGuard } from './guards/general.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    CatsModule,
    SharedModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: GeneralGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
