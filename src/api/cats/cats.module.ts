import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { CatService } from './cat.service';
import { CatsController } from './cats.controller';

@Module({
    imports: [ConfigModule.register({ folder: './config' })],
    controllers: [CatsController],
    providers: [CatService]
})
export class CatsModule {}
