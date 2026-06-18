import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({
            success: false,
            mensagem: "Token invalido ou expirado."
        })
    }

    const token = header.slice(7)

    if (!token) {
        return res.status(401).json({
            success: false,
            mensagem: "Token invalido ou expirado."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {id: string, role: string}
        req.usuario = { id: decoded.id, role: decoded.role }
        next()
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(401).json({
            success: false, 
            mensagem: "Token invalido ou expirado."
        })
    }
}