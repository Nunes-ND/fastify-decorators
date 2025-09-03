import type { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, DELETE, GET, Inject, POST, PUT } from 'fastify-decorators';
import { HTTP_STATUS } from '../constants/http-status';
import type { User } from '../entities/user.entity';
import { userSchemas } from '../schemas/user.schema';
import UsersService from '../services/users.service';

@Controller({ route: '/users' })
export default class UsersController {
  @Inject(UsersService)
  private usersService!: UsersService;

  @GET({ url: '/' })
  async index() {
    const [users, total] = await this.usersService.findAll();
    return {
      data: users,
      total,
    };
  }

  @POST({
    url: '/',
    options: {
      schema: {
        body: {
          ...userSchemas.body,
          required: Object.keys(userSchemas.body.properties),
        },
      },
    },
  })
  async store(request: FastifyRequest<{ Body: User }>, reply: FastifyReply) {
    const user = await this.usersService.create(request.body);
    return reply.code(HTTP_STATUS.CREATED).send(user);
  }

  @GET({
    url: '/:id',
    options: {
      schema: {
        params: userSchemas.params,
      },
    },
  })
  async show(request: FastifyRequest<{ Params: { id: number } }>) {
    return await this.usersService.findOne(request.params.id);
  }

  @PUT({
    url: '/:id',
    options: {
      schema: {
        body: userSchemas.body,
        params: userSchemas.params,
      },
    },
  })
  async update(
    request: FastifyRequest<{ Params: { id: number }; Body: Partial<User> }>
  ) {
    return await this.usersService.update(request.params.id, request.body);
  }

  @DELETE({
    url: '/:id',
    options: {
      schema: {
        params: userSchemas.params,
      },
    },
  })
  async destroy(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) {
    await this.usersService.remove(request.params.id);
    return reply.code(HTTP_STATUS.NO_CONTENT).send();
  }
}
