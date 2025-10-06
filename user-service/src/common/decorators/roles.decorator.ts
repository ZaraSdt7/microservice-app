import { SetMetadata } from "@nestjs/common";

export type UserRole = 'user' | 'admin';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);