import pool from '../database';
import { CartItem } from '../models/cartModel';

export const addToCart = async (userId: number, productId: number, quantity: number): Promise<void> => {
    await pool.query('INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)', [userId, productId, quantity]);
};

export const getCartItems = async (userId: number): Promise<CartItem[]> => {
    const [rows] = await pool.query('SELECT * FROM cart WHERE userId = ?', [userId]);
    return rows as CartItem[];
};
