import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const schema = z.object({
    email: z.string().email("Email inválido."),
    senha: z.string().min(6, "Senha deve conter ao menos 6 caracteres.")
})

export async function login(req: Request, res: Response) {
    try {
        const result = schema.safeParse(req.body)
        
        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos por favor."
            })
        }

        const {email, senha} = result.data
        const usuarioExiste = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        })

        if (!usuarioExiste) {
            return res.status(404).json({
                success: false,
                mensagem: "Esse usuario não existe no nosso sistema."
            })
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioExiste.senha)

        if (!senhaCorreta) {
            return res.status(400).json({
                success: false,
                mensagem: "Credencias inválido."
            })
        }

        const token = jwt.sign(
            { id: usuarioExiste.id, role: usuarioExiste.role },
            process.env.JWT_SECRET!,
            {expiresIn: '3h'}
        )

        return res.status(200).json({
            success: true,
            mensagem: "Logado com sucesso.",
            token,
            id: usuarioExiste.id,
            role: usuarioExiste.role
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false,
            mensagem: "Erro interno."
        })
    }
}