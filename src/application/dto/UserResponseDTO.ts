import { Role } from "domain/entities/value-objects/Roles";

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}