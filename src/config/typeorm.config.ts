import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DBHOST,
    port: 3306,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
};
