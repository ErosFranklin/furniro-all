import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import logger from '../utils/logger/logger.js';

type PublicUser = {
    id: string;
    email: string;
};

const toPublicUser = ({ id, email }: PublicUser): PublicUser => ({ id, email });

export default class UserController {
    constructor(private userService: UserService) {}

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const result = await this.userService.login(email, password);
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            logger.info(`POST /users/login - Login successful for email: ${email}`);
            res.status(200).json(result);
        } catch (error) {
            logger.error(`Error on login: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const user = req.body;
            const createdUser = await this.userService.createUser(user);
            logger.info(`POST /users - User created with email: ${createdUser.email}`);
            res.status(201).json(toPublicUser(createdUser));
        }catch(error){
            logger.error(`Error creating user: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }

    async findUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const id = req.params['id'] as string;

            const user = await this.userService.findUserById(id);
            logger.info(`GET /users/${id} - User found with email: ${user.email}`);
            res.status(200).json(toPublicUser(user));
        }catch(error){
            logger.error(`Error finding user by id: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }

    async findEmailByEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const email = req.params['email'] as string;
            const user = await this.userService.findEmailByEmail(email);

            logger.info(`GET /users/email/${email} - User found with email: ${user.email}`);
            res.status(200).json(toPublicUser(user));
        }catch(error){
            logger.error(`Error finding user by email: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            logger.info(`POST /users/logout - User logged out`);
            res.status(200).json({ message: 'Logged out successfully' });
        }catch(error){
            logger.error(`Error logging out: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const user = (req as any).user;
            logger.info(`GET /users/me - Fetching user info for user id: ${user?.id}`);
            if (!user) {
                logger.error(`GET /users/me - User not authenticated`);
                res.status(401).json({ message: 'Not authenticated' });
                return;
            }
            res.status(200).json({ id: user.id, email: user.email });
        }catch(error){
            logger.error(`Error fetching user info: ${error instanceof Error ? error.message : String(error)}`);
            next(error);
        }
    }
}
