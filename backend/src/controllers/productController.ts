import { Request, Response } from 'express';
import Product from '../models/product';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, price, description, stock } = req.body;
        const product = await Product.create({ name, price, description, stock });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: 'Error adding product' });
    }
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching products' });
    }
};
