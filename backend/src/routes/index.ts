import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import { addProduct, getProducts } from '../controllers/productController';
import { addToCart } from '../controllers/cartController';
import { createOrder } from '../controllers/orderController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    register(req, res).catch(next);
});

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    login(req, res).catch(next);
});

router.post('/products', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    addProduct(req, res).catch(next);
});

router.get('/products', (req: Request, res: Response, next: NextFunction) => {
    getProducts(req, res).catch(next);
});

router.post('/cart', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    addToCart(req, res).catch(next);
});

router.post('/orders', authMiddleware, (req: Request, res: Response, next: NextFunction) => {
    createOrder(req, res).catch(next);
});

export default router;
