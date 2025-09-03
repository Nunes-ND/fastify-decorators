import 'reflect-metadata';
import { fastify } from 'fastify';
import type { FastifySchemaValidationError } from 'fastify/types/schema';
import { bootstrap } from 'fastify-decorators';
import { HTTP_STATUS } from './constants/http-status';
import UsersController from './controllers/users.controller';
import { HttpError } from './errors/http.error';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const DEFAULT_PORT = 8000;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const server = fastify({ logger: IS_DEVELOPMENT });

server.register(bootstrap, {
  controllers: [UsersController],
});

server.setErrorHandler((error, _request, reply) => {
  server.log.error(error);

  if (error.validation) {
    return reply.status(HTTP_STATUS.BAD_REQUEST).send({
      message: 'Validation Error',
      errors: error.validation.map((err: FastifySchemaValidationError) => ({
        field: err.instancePath.substring(1) || err.params.missingProperty,
        message: err.message,
      })),
    });
  }

  if (error instanceof HttpError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  if (error.statusCode) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: 'Internal Server Error' });
});

server.listen({ port: PORT });
