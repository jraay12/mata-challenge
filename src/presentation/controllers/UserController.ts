import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import { CreateUserSchema, CreateUserDTO } from "../../application/dto/CreateUserDTO";
import { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

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
}