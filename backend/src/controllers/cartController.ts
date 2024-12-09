import { Request, Response } from 'express';
import { addToCart, getCartItems } from '../services/cartService';

declare module 'express' {
    export interface Request {
        user?: { id: number };
    }
}

export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user!.id;
        await addToCart(userId, productId, quantity);
        res.status(201).send('Item added to cart');
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        res.status(500).send(errorMessage);
    }
};

export const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const cartItems = await getCartItems(userId);
        res.json(cartItems);
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        res.status(500).send(errorMessage);
    }
};
