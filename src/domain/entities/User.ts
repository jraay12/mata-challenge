import { Role } from "./value-objects/Roles";
import { UserResponseDTO } from "application/dto/UserResponseDTO";
import crypto from "crypto";
export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps;
  private static readonly MAX_NAME_LENGTH = 100;
  private static readonly MIN_PASSWORD_LENGTH = 6;

  private constructor(props: UserProps) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static create(props: Omit<UserProps, "id" | "createdAt" | "updatedAt">) {
    if (props.name.length > User.MAX_NAME_LENGTH) {
      throw new Error(`Name cannot exceed ${User.MAX_NAME_LENGTH} characters`);
    }

    if (props.password.length < User.MIN_PASSWORD_LENGTH) {
      throw new Error(
        `Password must be at least ${User.MIN_PASSWORD_LENGTH} characters`,
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(props.email)) {
      throw new Error("Invalid email format");
    }

    return new User({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  updateName(newName: string, currentUserRole: Role) {
    if (newName.length > User.MAX_NAME_LENGTH) {
      throw new Error(`Name cannot exceed ${User.MAX_NAME_LENGTH} characters`);
    }

    if (currentUserRole != Role.ADMIN) {
      throw new Error("Unauthorized: Only admins can update users");
    }

    this.props.name = newName;
    this.props.updatedAt = new Date();
  }

  toJSON(): UserResponseDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  setPassword(hash: string) {
    this.props.password = hash;
  }

  // Getters
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get email() {
    return this.props.email;
  }
  get password() {
    return this.props.password;
  }
  get role() {
    return this.props.role;
  }
  get createdAt() {
    return this.props.createdAt!;
  }
  get updatedAt() {
    return this.props.updatedAt!;
  }
}
