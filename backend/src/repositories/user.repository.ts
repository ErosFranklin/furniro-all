import type { User } from "@prisma/client";

export interface UserRepository{
    createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
    findUserById(id: string): Promise<User | null>
    findEmailByEmail(email: string): Promise<User | null>
}