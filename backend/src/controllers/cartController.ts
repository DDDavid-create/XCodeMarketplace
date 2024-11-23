import { Request, Response } from 'express';
import Product from '../models/product';
import Order from '../models/order';

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findByPk(productId);

        if (!product || product.stock < quantity) {
            res.status(400).json({ error: 'Product not available in requested quantity' });
            return;
        }

        const [order] = await Order.findOrCreate({
            where: { userId: (req as any).user.userId, status: 'Pending' },
            defaults: { userId: (req as any).user.userId, products: [], total: 0, status: 'Pending' }
        });

        const updatedProducts = [...order.products, { product: productId, quantity }];
        order.products = updatedProducts;
        order.total += product.price * quantity;
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Error adding to cart' });
    }
};
