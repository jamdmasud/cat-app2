import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CatsModule } from './api/cats/cats.module';
import { AllExceptionFilter } from './all.exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { GeneralGuard } from './guards/general.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { Connection } from 'typeorm';
import "reflect-metadata";

@Module({
  imports: [
    CatsModule,
    SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get("DATABASE_HOST"),
        port: parseInt(configService.get("PORT")),
        username: configService.get("USERNAME"),
        password: configService.get("PASSWORD"),
        database: configService.get("DATABASE"),
        options: {
          encrypt: true,
          enableArithAbort: true,
        },
        synchronize: true,
        autoLoadEntities: true,
        retryAttempts: 5
      }),
      inject: [ConfigService],
    }),
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
    },
    Logger
  ],
})
export class AppModule implements NestModule {
  constructor(connection: Connection){}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
