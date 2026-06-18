'use server'

import { cookies } from "next/headers"
import z from "zod"

const schema = z.object({
    nome: z.string().min(3),
    sobrenome: z.string().min(3),
    cpf: z.string().min(11).max(14),
    telefone: z.string().min(10).max(15),
    email: z.string().email(),
    numero_mesa: z.number().positive()
})
const schemaOpt = schema.partial()

type FormData = z.infer<typeof schema>
type FormDataOpt = z.infer<typeof schemaOpt>

export async function listarConvidados() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados`, {
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
    return data.convidados
}

export async function buscarConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados/${id}`, {
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
    return data.convidado
}

export async function checkinConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados/checkin/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    
    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }
    return {success: true, mensagem: data.mensagem}
}

export async function registrarConvidado(data: FormData) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados/registrar`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: response.mensagem}
    }
    return {success: true, mensagem: response.mensagem}
}

export async function atualizarConvidado(id: string, data: FormDataOpt) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const response = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: response.mensagem}
    }
    return {success: true, mensagem: response.mensagem}
}

export async function deletarConvidado(id: string) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convidados/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    if (!res.ok) {
    const text = await res.text()
    console.error("API retornou:", text)
    return { success: false, mensagem: "Erro na API" }
    }

    
    const data = await res.json()
    if (!res.ok) {
        return {success: false, mensagem: data.mensagem }
    }
    return {success: true, mensagem: data.mensagem }
}