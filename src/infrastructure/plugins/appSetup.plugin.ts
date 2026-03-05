import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { UserRepository } from "../repositories/UserRepository";
import { BcryptPasswordHasher } from "../services/BcryptPasswordHasher";
import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import { UserController } from "../../presentation/controllers/UserController";
import { JwtServiceImpl } from "../services/JwtServiceImpl";
import { LoginUserUsecase } from "../../application/usecase/LoginUserUsecase";
declare module "fastify" {
  interface FastifyInstance {
    userRepository: UserRepository;
    bcryptPasswordHasher: BcryptPasswordHasher;
    createUserUsecase: CreateUserUsecase;
    userController: UserController;
    jwtService: JwtServiceImpl;
    loginUserUsecase: LoginUserUsecase
  }
}

const appSetupPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error(
      "ACCESS_TOKEN_SECRET or REFRESH_TOKEN_SECRET is not defined in environment variables",
    );
  }

  const bcryptPasswordHasher = new BcryptPasswordHasher();
  const userRepository = new UserRepository(fastify.prisma);
  const jwtService = new JwtServiceImpl(accessTokenSecret, refreshTokenSecret);

  // Usecases
  const createUserUsecase = new CreateUserUsecase(
    userRepository,
    bcryptPasswordHasher,
  );
  const loginUserUsecase = new LoginUserUsecase(userRepository, jwtService, bcryptPasswordHasher)

  // Controllers
  const userController = new UserController(createUserUsecase, loginUserUsecase);

  fastify.decorate("bcryptPasswordHasher", bcryptPasswordHasher);
  fastify.decorate("userRepository", userRepository);
  fastify.decorate("createUserUsecase", createUserUsecase);
  fastify.decorate("userController", userController);
  fastify.decorate('loginUserUsecase', loginUserUsecase)
});

export default appSetupPlugin;
