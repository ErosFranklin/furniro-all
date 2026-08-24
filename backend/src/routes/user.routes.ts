import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import PrismaUserRepository from '../repositories/prisma.user.repository.js';
import { UserService } from '../services/user.service.js';
import UserController from '../controllers/user.controller.js';
import { validateId, validateEmail } from '../middlewares/validation.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/login', (req, res, next) => userController.login(req, res, next));
router.post('/', (req, res, next) => userController.createUser(req, res, next));
router.get('/id/:id', authMiddleware, validateId, (req, res, next) => userController.findUserById(req, res, next));
router.get('/email/:email', authMiddleware, validateEmail, (req, res, next) => userController.findEmailByEmail(req, res, next));

export const userRoutes = router;