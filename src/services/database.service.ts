import { Initializer, Service } from 'fastify-decorators';
import type { DataSource } from 'typeorm';
import { dataSource } from '../../datasource';

@Service()
export default class DatabaseService {
  dataSource: DataSource = dataSource;

  @Initializer()
  private async init() {
    await this.dataSource.initialize();
  }
}
