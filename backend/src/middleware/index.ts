import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { doubleCsrf } from 'csrf-csrf'
import dotenv from 'dotenv'

dotenv.config()

const allowedOrigins = [
	process.env.FRONTEND_URL || 'http://localhost:8080',
	'http://localhost',
	'http://localhost:80',
]

export const corsMiddleware = cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true,
})

export const cookieMiddleware = cookieParser()

const { doubleCsrfProtection, generateToken } = doubleCsrf({
	getSecret: () => process.env.CSRF_SECRET || 'your-csrf-secret-key',
	cookieName: 'csrf',
	cookieOptions: {
		httpOnly: false,
		sameSite: 'lax',
		path: '/',
		secure: process.env.NODE_ENV === 'production',
	},
	getTokenFromRequest: (req) => {
		// Проверяем токен в разных местах
		return (
			req.headers['x-csrf-token'] ||
			req.headers['x-xsrf-token'] ||
			req.body?._csrf ||
			req.query?._csrf ||
			''
		)
	},
	ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
})

export const csrfMiddleware = doubleCsrfProtection

export const generateCsrfToken = generateToken

export const jsonMiddleware = express.json()

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({
		status: 404,
		error: 'Такой страницы не существует',
	})
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err.name === 'ForbiddenError') {
		console.log('CSRF Error:', err)
		console.log('Request cookies:', req.cookies)
		console.log('Request headers:', req.headers)
		console.log('Request body:', req.body)
		res.status(403).json({
			status: 403,
			error: 'Отсутствует или неверный CSRF токен',
		})
		return
	}

	next(err)
}
