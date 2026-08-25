import type { UserRepository } from '../repositories/user.repository.js';
import type {User} from '@prisma/client';
import { NotFoundException, BadRequestException, ConflictException } from '../middlewares/http-exception.middleware.js';
import logger from '../utils/logger/logger.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env['JWT_SECRET'] ?? (() => { throw new Error('JWT_SECRET is not defined') })();

const JWT_EXPIRES= '7d';
const SALT_ROUNDS = 10;

export class UserService {
    constructor(private userRepository: UserRepository) {}
    private validatePassword(password: string): void {
        if (password.length < 6) {
            throw new BadRequestException('Password must be at least 6 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            throw new BadRequestException('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            throw new BadRequestException('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            throw new BadRequestException('Password must contain at least one number');
        }
    }

    async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {

        logger.info(`Creating user with email: ${user.email}`)
        
        if (!user.email || !user.password) {
            logger.error('Email, password and name are required')
            throw new BadRequestException('Email, password and name are required')
        }

        this.validatePassword(user.password)
        logger.info('Password validation passed')

        const existingUser = await this.userRepository.findEmailByEmail(user.email)
        if (existingUser) {
            logger.error(`User with email "${user.email}" already exists`)
            throw new ConflictException(`User with email "${user.email}" already exists`)
        }
        const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS)
        return await this.userRepository.createUser({ ...user, password: hashedPassword })
    }

    async findUserById(id: string): Promise<User> {
        logger.info(`Search user by id: ${id}`)

        if (!id) {
            logger.error('ID is required')
            throw new BadRequestException('ID is required')
        }

        const user = await this.userRepository.findUserById(id)

        if (!user) {
            logger.error(`User with id "${id}" not found`);
            throw new NotFoundException(`User with id "${id}" not found`)
        }

        return user;
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        logger.info(`Login attempt for email: ${email}`)

        if (!email || !password) {
            throw new BadRequestException('Email and password are required')
        }

        const user = await this.userRepository.findEmailByEmail(email)
        if (!user) {
            throw new BadRequestException('Invalid credentials')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new BadRequestException('Invalid credentials')
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
        return { token }
    }

    async findEmailByEmail(email: string): Promise<Omit<User, 'password'>> {
        logger.info(`Search user by email: ${email}`)
        if (!email) {
            logger.error('Email is required')
            throw new BadRequestException('Email is required')
        }

        const user = await this.userRepository.findEmailByEmail(email)

        if (!user) {
            logger.error(`User with email "${email}" not found`);
            throw new NotFoundException(`User with email "${email}" not found`)
        }
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}
