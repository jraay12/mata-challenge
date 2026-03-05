import { Role } from "./value-objects/Roles";
import { UserResponseDTO } from "application/dto/UserResponseDTO";
import crypto from "crypto";
export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  address?: string | null;
  phone?: string | null;
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

    // Philippine phone number formats: +63XXXXXXXXX, 09XXXXXXXXX, 9XXXXXXXXX
    const phoneRegex = /^(\+63|0)?9\d{9}$/;
    if (props.phone && !phoneRegex.test(props.phone)) {
      throw new Error(
        "Phone number must start with +63, 09, or 9 and have 10 digits after the prefix",
      );
    }

    return new User({
      ...props,
      id: crypto.randomUUID(),
    });
  }

  static fromPersistence(props: UserProps): User {
    return new User(props);
  }

  updateFields(fields: {
    name?: string;
    phone?: string | null;
    address?: string | null;
  }) {
    if (fields.name !== undefined) {
      if (fields.name.length > User.MAX_NAME_LENGTH) {
        throw new Error(
          `Name cannot exceed ${User.MAX_NAME_LENGTH} characters`,
        );
      }
      this.props.name = fields.name;
    }

    if (fields.phone !== undefined) {
      const phoneRegex = /^(\+63|0)?9\d{9}$/;
      if (fields.phone && !phoneRegex.test(fields.phone)) {
        throw new Error(
          "Phone number must start with +63, 09, or 9 and have 10 digits after the prefix",
        );
      }
      this.props.phone = fields.phone ?? null;
    }

    if (fields.address !== undefined) {
      this.props.address = fields.address;
    }

    this.props.updatedAt = new Date();
  }

  toJSON(): UserResponseDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      phone: this.phone,
      address: this.address,
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

  get phone() {
    return this.props.phone!;
  }

  get address() {
    return this.props.address!;
  }
}
