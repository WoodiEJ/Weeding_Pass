'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(email: string, senha: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, senha})
    })

    const data = await res.json()

    if (!res.ok) {
        return {success: false, mensagem: data.mensagem}
    }

    const token = data.token
    const cookieStore = await cookies()

    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: '/'
    })
    cookieStore.set("id", data.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: '/'
    })
    cookieStore.set("role", data.role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24,
        path: '/'
    })

    return { success: true }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("token")
    cookieStore.delete("id")
    cookieStore.delete("role")
    redirect('/')
}