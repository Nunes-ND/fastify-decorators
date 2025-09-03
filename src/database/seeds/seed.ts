/** biome-ignore-all lint/suspicious/noConsole: Console logging is intentional for this CLI script to provide user feedback. */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from '../../../datasource';
import { UserFactory } from '../factories/user.factory';
import { MainSeeder } from './main.seeder';

const options = {
  ...dataSourceOptions,
  seeds: [MainSeeder],
  factories: [UserFactory],
};

const dataSource = new DataSource(options);

async function run() {
  try {
    console.log('Initializing data source for seeding...');
    await dataSource.initialize();
    console.log('Data source initialized. Running seeders...');

    await runSeeders(dataSource);

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Data source connection closed.');
    }
    process.exit(0);
  }
}

run();
