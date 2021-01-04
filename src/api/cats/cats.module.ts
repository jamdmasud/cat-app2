import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatsController } from './cats.controller';

@Module({
    imports: [],
    controllers: [CatsController],
    providers: [CatService]
})
export class CatsModule {}
