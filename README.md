# Fastify Decorators Getting Started

## Introduction

This is a Proof of Concept (PoC) that uses Fastify with `fastify-decorators` and TypeORM to develop a modern, robust, and scalable RESTful API for user management. The project demonstrates the use of decorators for a declarative and clean syntax, dependency injection for low coupling, and an organized structure for easy maintenance.

## Key Features

*   **Fastify with Decorators**: Uses `fastify-decorators` to define controllers and routes declaratively (`@Controller`, `@GET`, `@POST`, etc.), making the code more readable and organized.
*   **Dependency Injection (DI)**: Integrated DI system with decorators (`@Service`, `@Inject`, `@Initializer`) that manages the lifecycle and dependencies of services, promoting low coupling and facilitating testing.
*   **TypeORM and Repositories**: Integration with TypeORM for object-relational mapping (ORM). Entities are defined with decorators (`@Entity`, `@Column`, etc.), and data access logic is abstracted into services using the Repository pattern.
*   **Database Seeding and Factories**: Utilizes `typeorm-extension` to populate the database with test data. Seeders and factories are written in TypeScript, allowing for strong typing and better project integration.
*   **Centralized Error Handling**: A custom error handler in `src/main.ts` that catches application exceptions (including validation errors and custom HTTP errors) and returns standardized responses to the client.
*   **Schema Validation**: Leverages Fastify's schema validation system to efficiently validate request `params`, `body`, and `querystring`.
*   **Environment-based Configuration**: The project differentiates between development and production configurations, for example, to enable/disable TypeORM's `synchronize` and logging.

## Project Structure

*   **`src/controllers`**: Contains the controllers that handle HTTP requests. Each controller groups endpoints related to an API resource.
*   **`src/services`**: Service layer that encapsulates business logic. It is injected into controllers to maintain separation of concerns.
*   **`src/entities`**: TypeORM entity definitions, which represent the database tables.
*   **`src/schemas`**: Contains Fastify's validation schemas for requests.
*   **`src/errors`**: Definitions of custom error classes for the application.
*   **`src/database/seeds`**: Seeders to populate the database with test data in a development environment.
*   **`src/database/factories`**: Factories to generate entity instances with fake data, used by the seeders.
*   **`src/database/migrations`**: TypeORM migrations to manage the evolution of the database schema.
*   **`datasource.ts`**: TypeORM `DataSource` connection configuration file.

## Setup

1.  **Install the dependencies:**
    ```bash
    npm install
    ```

2.  **Configure environment variables:**
    Copy the `.env.example` file to `.env` and adjust the settings, such as the path to the SQLite database file and other options.

3.  **Run the database migrations:**
    This command applies all pending migrations.
    ```bash
    npm run typeorm:migration:run
    ```

4.  **Seed the database (optional):**
    To populate the database with test data, run the seeder.
    ```bash
    npm run dev:typeorm:seed:run
    ```

## Running the Project

To start the server in development mode with hot-reload:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:8000`.

## Scripts Disponíveis

*   `npm run dev`: Inicia o servidor em modo de desenvolvimento.
*   `npm run build`: Compila o código TypeScript para JavaScript (localizado em `./dist`).
*   `npm run start`: Inicia o servidor em modo de produção (requer `npm run build` antes).
*   `npm test`: Executa todos os testes (unitários e de integração) com Vitest.
*   `npm run typeorm:migration:generate -- -n <MigrationName>`: Gera uma nova migração baseada nas mudanças das entidades.
*   `npm run typeorm:migration:run`: Aplica as migrações.
*   `npm run typeorm:migration:revert`: Reverte a última migração aplicada.
*   `npm run dev:typeorm:seed:run`: Executa os seeders para popular o banco de dados.