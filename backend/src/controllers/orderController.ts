import { Request, Response } from 'express';
import Order from '../models/order';

interface AuthRequest extends Request {
    user?: {
        userId: number;
    };
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { products } = req.body;
        const total = products.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);

        if (!req.user || !req.user.userId) {
            res.status(401).json({ error: 'User ID is required to create an order' });
            return;
        }

        const order = await Order.create({
            userId: req.user.userId,
            products,
            total,
            status: 'Pending'
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: 'Error creating order' });
    }
};
