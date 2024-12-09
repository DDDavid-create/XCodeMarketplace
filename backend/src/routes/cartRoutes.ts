import { Router } from 'express';
import { addItemToCart, getCart } from '../controllers/cartController';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/cart', authenticate as any, addItemToCart);
router.get('/cart', authenticate as any, getCart);

export default router;
