import { Initializer, Inject, Service } from 'fastify-decorators';
import type { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { NotFoundError } from '../errors/http.error';
import DatabaseService from './database.service';

@Service()
export default class UsersService {
  private repository!: Repository<User>;

  @Inject(DatabaseService)
  private readonly connectionService!: DatabaseService;

  @Initializer([DatabaseService])
  private init() {
    this.repository = this.connectionService.dataSource.getRepository(User);
  }

  async create(user: Partial<User>) {
    const newUser = this.repository.create(user);
    return await this.repository.save(newUser);
  }

  async findAll() {
    const [users, total] = await this.repository.findAndCount();
    return [users, total];
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id: Number(id) });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async update(id: number, user: Partial<User>) {
    const userToUpdate = await this.findOne(id);
    Object.assign(userToUpdate, user);
    return this.repository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.findOne(id);
    return this.repository.remove(userToRemove);
  }
}
