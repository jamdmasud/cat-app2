import { Global, Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';

@Global()
@Module({
    imports: [ConfigModule.register({ folder: './config' })],
    exports: [ConfigModule]
})
export class SharedModule {}
