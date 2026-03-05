import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { PrismaClient } from "@prisma/client";
import { Role as DomainRole } from "../../domain/entities/value-objects/Roles";
export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        address: user.address,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return User.fromPersistence({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role === "STAFF" ? DomainRole.STAFF : DomainRole.ADMIN,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
