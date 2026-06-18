'use server'

import { cookies } from "next/headers"
import * as z from "zod"

const schema = z.object({
    nome: z.string().min(3),
    cpf: z.string().min(11).max(14),
    email: z.string().email(),
    senha: z.string().min(6),
    role: z.enum(["ADMIN", "RECEP"])
})
const schemaOpt = schema.partial()

type FormData = z.infer<typeof schema>
type FormDataOpt = z.infer<typeof schemaOpt>

export async function listarUsuarios() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }
    return data.usuarios
}

export async function buscarUsuario(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }
    return data.usuario
}

export async function criarUsuario(data: FormData) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/criar`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    if (!res.ok) {
        return { success: false, mensagem: response.mensagem }
    }
    return {success: true, mensagem: response.mensagem}
}

export async function atualizarUsuario(id: string, data: FormDataOpt) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    if (!res.ok) {
        return { success: false, mensagem: response.mensagem }
    }
    return {success: true, mensagem: response.mensagem}
}

export async function deletarUsuario(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    })

    const response = await res.json()
    if (!res.ok) {
        return { success: false, mensagem: response.mensagem }
    }
    return {success: true, mensagem: response.mensagem}
}

export async function dadoUsuario() {
    const cookieStore = await cookies()
    const id = cookieStore.get("id")?.value
    const role = cookieStore.get("role")?.value

    const usuario = { id, role }
    return usuario
}