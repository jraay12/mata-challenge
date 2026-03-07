import { CreateUserUsecase } from "../../application/usecase/CreateUserUsecase";
import {
  CreateUserSchema,
  CreateUserDTO,
} from "../../application/dto/CreateUserDTO";
import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserUsecase } from "../../application/usecase/LoginUserUsecase";
import { LoginSchema, LoginUserDTO } from "../../application/dto/LoginUserDTO";
import { UpdateCustomerDetails } from "../../application/usecase/UpdateCustomerDetails";
import {
  UpdateCustomerDTO,
  UpdateCustomerParams,
  UpdateCustomerParamsSchema,
  UpdateCustomerSchema,
} from "../../application/dto/UpdateCustomerDTO";
export class UserController {
  constructor(
    private createUserUsecase: CreateUserUsecase,
    private loginUserUsecase: LoginUserUsecase,
    private updateCustomerDetails: UpdateCustomerDetails,
  ) {}

  createUser = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const dto: CreateUserDTO = CreateUserSchema.parse(request.body);
    const user = await this.createUserUsecase.execute(dto);
    reply.code(201).send(user);
  };

  login = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
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
      token: accessToken,
    });
  };

  updateDetails = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> => {
    const params: UpdateCustomerParams = UpdateCustomerParamsSchema.parse(
      request.params,
    );
    const userId = params.userId;
    const dto: UpdateCustomerDTO = UpdateCustomerSchema.parse(request.body);
    const result = await this.updateCustomerDetails.execute(userId, dto);
    reply.code(200).send(result);
  };
}
