import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { User } from "../../domain/entities/User";
import { Role } from "../../domain/entities/value-objects/Roles";

export class CreateUserUsecase {
  constructor(private userRepo: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepo.findByEmail(data.email);

    if (existingUser) throw new Error("User email already exist!");

    const user = User.create({
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role ?? Role.STAFF,
    });

    await this.userRepo.create(user);

    return user.toJSON();
  }
}
