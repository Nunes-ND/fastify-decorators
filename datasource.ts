import { join } from 'node:path';
import { DataSource, type DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

const isProduction = process.env.NODE_ENV === 'production';
const rootDir = isProduction ? 'dist' : 'src';
const extension = isProduction ? '.js' : '.ts';

const options: DataSourceOptions & SeederOptions = {
  type: 'better-sqlite3',
  database: String(process.env.DB_FILE),
  entities: [join(__dirname, rootDir, `entities/**/*${extension}`)],
  migrations: [
    join(__dirname, rootDir, `database/migrations/**/*${extension}`),
  ],
  subscribers: [
    join(__dirname, rootDir, `database/subscribers/**/*${extension}`),
  ],
  synchronize: !isProduction,
  logging: !isProduction,
};

if (!isProduction) {
  options.seeds = [join(__dirname, 'src/database/seeds/**/*.ts')];
  options.factories = [join(__dirname, 'src/database/factories/**/*.ts')];
}

export const dataSourceOptions = options;
export const dataSource = new DataSource(dataSourceOptions);
