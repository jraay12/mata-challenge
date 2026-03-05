import { FastifyInstance } from "fastify";
import { prisma } from "../../infrastructure/prisma/client";
import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";

const userRepository = new UserRepository(prisma);

// usecases
const createUserUsecase = new CreateUserUsecase(userRepository);

const userController = new UserController(createUserUsecase);

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/create", userController.createUser);
}
