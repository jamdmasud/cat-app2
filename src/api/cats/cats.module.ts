import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatService } from './cat.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity'; 
@Module({
    imports: [TypeOrmModule.forFeature([Cat])],
    controllers: [CatsController],
    providers: [CatService, Logger]
})
export class CatsModule {}
