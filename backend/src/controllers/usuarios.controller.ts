import { Request, Response } from "express";
import z from "zod";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import bcrypt from 'bcrypt'
 
const schema = z.object({
    nome: z.string().min(6),
    cpf: z.string().min(11).max(14),
    email: z.string().email(),
    senha: z.string().min(6),
    role: z.nativeEnum(Role)
})

const schemaOptional = schema.partial()

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await prisma.usuarios.findMany({
            select: {
                id: true,
                nome: true, 
                cpf: true,
                email: true,
                senha: false,
                role: true
            }
        })

        if (usuarios.length === 0) {
            return res.status(404).json({
                success: false,
                mensagem: "Nenhum usuario encontrado."
            })
        }

        return res.status(200).json({
            success: true,
            usuarios
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false, 
            mensagem: "Erro interno."
        })
    }
}

export async function buscarUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const usuario = await prisma.usuarios.findUnique({ where: { id } })
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuario não encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            usuario
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false, 
            mensagem: "Erro interno."
        })
    }
}

export async function criarUsuario(req: Request, res: Response) {
    try {
        const result = schema.safeParse(req.body)
        
        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos por favor."
            })
        }

        const { nome, cpf, email, senha, role } = result.data
        const usuarioExiste = await prisma.usuarios.findFirst({
            where: {
                email: email
            }
        })

        if (usuarioExiste) {
            return res.status(409).json({
                success: false,
                mensagem: "Usuario já existe no sistema."
            })
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await prisma.usuarios.create({
            data: {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senhaCriptografada,
                role: role
            }
        })

        return res.status(201).json({
            success: true,
            mensagem: "Usuario criado com sucesso."
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false, 
            mensagem: "Erro interno."
        })
    }
}

export async function editarUsuario(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const usuario = await prisma.usuarios.findUnique({ where: { id } })
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuario não encontrado."
            })
        }

        const result = schemaOptional.safeParse(req.body)

        if (!result.success) {
            return res.status(400).json({
                success: false,
                mensagem: "Valide os campos por favor."
            })
        }

        await prisma.usuarios.update({
            where: { id },
            data: result.data
        })
        return res.status(200).json({
            success: true, 
            mensagem: "Usuario editado com sucesso."
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false, 
            mensagem: "Erro interno."
        })
    }
}

export async function deletarUsuarios(req: Request, res: Response) {
    try {
        const id = req.params.id as string
        const usuario = await prisma.usuarios.findUnique({ where: { id } })
        
        if (!usuario) {
            return res.status(404).json({
                success: false,
                mensagem: "Usuario não existe."
            })
        }

        await prisma.usuarios.delete({ where: { id } })
        return res.status(200).json({
            success: false,
            mensagem: "Usuario deletado com sucesso."
        })
    } catch (error) {
        console.error("Erro interno: ", error)
        return res.status(500).json({
            success: false, 
            mensagem: "Erro interno."
        })
    }
}