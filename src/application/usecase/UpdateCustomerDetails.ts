import { UpdateCustomerDTO } from "application/dto/UpdateCustomerDTO";
import { UserRepository } from "infrastructure/repositories/UserRepository";
import { User } from "domain/entities/User";
export class UpdateCustomerDetails {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string, data: UpdateCustomerDTO): Promise<User> {
    const user = await this.userRepo.findByID(id);

    if (!user) throw new Error("User not found");

    user.updateFields({
      address: data.address,
      name: data.name,
      phone: data.phone ?? null,
    });

    await this.userRepo.updateDetails(user)

    return user
  }
}
