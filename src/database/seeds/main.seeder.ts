import type { DataSource } from 'typeorm';
import type { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entities/user.entity';

export class MainSeeder implements Seeder {
  async run(
    _dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error(
        'Database seeding is only allowed in the development environment.'
      );
    }

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(10);
  }
}
