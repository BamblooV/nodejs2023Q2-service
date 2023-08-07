import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './ormconfig';

@Global()
@Module({
  controllers: [],
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
