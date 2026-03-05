import { LoginUserDTO } from "application/dto/LoginUserDTO";
import { IUserRepository } from "domain/repositories/IUserRepository";
import { JwtService } from "domain/services/JwtService";
import { PasswordHasher } from "domain/services/PasswordHasher";
export class LoginUserUsecase {
  constructor(
    private userRepo: IUserRepository,
    private jwtService: JwtService,
    private passwordHasher: PasswordHasher,
  ) {}

  async execute(
    data: LoginUserDTO,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) throw new Error("Invalid credentials");

    const match = await this.passwordHasher.compare(
      data.password,
      user.password,
    );

    if (!match) throw new Error("Invalid credentials");

    const accessToken = await this.jwtService.signAccessToken(
      { id: user.id, role: user.role },
      "15m",
    );
    const refreshToken = await this.jwtService.signRefreshToken(
      {
        id: user.id,
        role: user.role,
      },
      "7d",
    );

    return { accessToken, refreshToken };
  }
}
