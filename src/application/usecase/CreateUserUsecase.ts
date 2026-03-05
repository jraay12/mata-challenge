import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { UserResponseDTO } from "../dto/UserResponseDTO";
import { User } from "../../domain/entities/User";
import { Role } from "../../domain/entities/value-objects/Roles";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class CreateUserUsecase {
  constructor(
    private userRepo: IUserRepository,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
    const existingUser = await this.userRepo.findByEmail(data.email);

    if (existingUser) throw new Error("User email already exist!");

    const user = User.create({
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role ?? Role.STAFF,
      address: data.address ?? null,
      phone: data.phone ?? null,
    });

    const passwordHash = await this.passwordHasher.hash(user.password);

    user.setPassword(passwordHash);

    await this.userRepo.create(user);

    return user.toJSON();
  }
}
