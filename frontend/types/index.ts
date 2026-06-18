export interface Convidado {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
    presenca: boolean
}

export interface Usuario {
    id: string
    nome: string
    cpf: string
    email: string
    role: "ADMIN" | "RECEP"
}

export interface JwtPaylaod {
    id: number
    role: "ADMIN" | "RECEP"
}