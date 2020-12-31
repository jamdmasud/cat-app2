import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatService } from './cats/cat.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
