import { NextFunction, Request, Response } from "express";

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.usuario.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            mensagem: "Acesso negado."
        })
    }
    next()
} 