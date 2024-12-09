import { Router } from 'express';
import multer from 'multer';
import { getProducts, createProduct } from '../controllers/productController';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/products', getProducts);
router.post('/products', upload.single('image'), createProduct);

export default router;
