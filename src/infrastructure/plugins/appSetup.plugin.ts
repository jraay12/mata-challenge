// src/infrastructure/plugins/appSetup.plugin.ts
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher";
import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import { UserController } from "../../presentation/controllers/UserController";

declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    bcryptPasswordHasher: BcryptPasswordHasher;
    createUserUsecase: CreateUserUsecase;
    userController: UserController;
  }
}

const appSetupPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const bcryptPasswordHasher = new BcryptPasswordHasher();
  const userRepository = new UserRepository(fastify.prisma);
  const createUserUsecase = new CreateUserUsecase(userRepository, bcryptPasswordHasher);
  const userController = new UserController(createUserUsecase);

  fastify.decorate("bcryptPasswordHasher", bcryptPasswordHasher);
  fastify.decorate("userRepository", userRepository);
  fastify.decorate("createUserUsecase", createUserUsecase);
  fastify.decorate("userController", userController);
});

export default appSetupPlugin;