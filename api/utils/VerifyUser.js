import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'Access Denied. No token provided.'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(errorHandler(401, 'Invalid token.'));
            }
            return decoded;
        });
        req.user = decoded;
        next();
    } catch (error) {
        return next(errorHandler(401, 'Invalid token.'));
    }
}