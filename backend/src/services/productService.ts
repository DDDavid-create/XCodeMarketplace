import pool from '../database';
import { Product } from '../models/productModel';

export const getAllProducts = async (): Promise<Product[]> => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows as Product[];
};

export const addProduct = async (product: Product): Promise<void> => {
    const { title, description, price, imageUrl } = product;
    await pool.query('INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)', [title, description, price, imageUrl]);
};
