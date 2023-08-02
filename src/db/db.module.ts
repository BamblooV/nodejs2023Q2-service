import { Global, Module } from '@nestjs/common';
import { DBService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './ormconfig';

@Global()
@Module({
  controllers: [],
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [DBService],
  exports: [DBService],
})
export class DbModule {}
