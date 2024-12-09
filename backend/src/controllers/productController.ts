import { Request, Response } from 'express';
import { getAllProducts, addProduct } from '../services/productService';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        res.status(500).send(errorMessage);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { title, description, price } = req.body;
        const imageUrl = req.file?.path || '';
        await addProduct({ title, description, price, imageUrl });
        res.status(201).send('Product created');
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        res.status(500).send(errorMessage);
    }
};
