import { FastifyInstance } from "fastify";
import { prisma } from "../../infrastructure/prisma/client";
import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { BcryptPasswordHasher } from "../../infrastructure/services/BcryptPasswordHasher";

const userRepository = new UserRepository(prisma);
const bcryptPasswordHasher = new BcryptPasswordHasher();

// usecases
const createUserUsecase = new CreateUserUsecase(userRepository, bcryptPasswordHasher);

const userController = new UserController(createUserUsecase);

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create", userController.createUser);
}
