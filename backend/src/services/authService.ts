import pool from '../database';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (username: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
};

export const loginUser = async (username: string, password: string): Promise<string> => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = (rows as User[])[0];

    if (user && await bcrypt.compare(password, user.password)) {
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    } else {
        throw new Error('Invalid credentials');
    }
};
