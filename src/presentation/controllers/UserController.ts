import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import {
  CreateUserSchema,
  CreateUserDTO,
} from "../../application/dto/CreateUserDTO";
import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserUsecase } from "../../application/usecase/LoginUserUsecase";
import { LoginSchema, LoginUserDTO } from "../../application/dto/LoginUserDTO";

export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private loginUserUsecase: LoginUserUsecase,
  ) {}

  createUser = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const dto: CreateUserDTO = CreateUserSchema.parse(request.body);

      const user = await this.createUserUsecase.execute(dto);

      reply.code(201).send(user);
    } catch (error) {
      throw error;
    }
  };

  login = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const dto: LoginUserDTO = LoginSchema.parse(request.body);

      const { refreshToken, accessToken } =
        await this.loginUserUsecase.execute(dto);
      reply.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        signed: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60,
      });
      reply.code(200).send({
        token: accessToken
      });
    } catch (error) {
      throw error;
    }
  };
}
