import type { PrismaClient, User } from "@prisma/client";
import type {UserRepository} from "./user.repository.js";

export default class PrismaUserRepository implements UserRepository {
    constructor(private prisma: PrismaClient){}

    async findUserById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async findEmailByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        });
    }

    async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return await this.prisma.user.create({
            data: user
        });
    }
}