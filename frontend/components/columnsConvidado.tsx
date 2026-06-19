"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Check, Eye, Trash } from "lucide-react"
import { DialogAtualizarUsuario } from "./dialog-atualizar-usuario"
import { buscarConvidado, checkinConvidado, deletarConvidado } from "@/actions/convidados"
import { dadoUsuario } from "@/actions/usuarios"
import { DialogAtualizarConvidado } from "./dialog-atualizar-convidado"

export type Convidado = {
    id: string
    nome: string
    sobrenome: string
    cpf: string
    telefone: string
    email: string
    numero_mesa: number
    presenca: boolean
}

export function AcoesConvidado({ id, presenca }: { id: string, presenca: boolean }) {
    const router = useRouter()

    async function deletar() {
        const usuario = await dadoUsuario()

        if (usuario.role !== "ADMIN") {
            toast.error("Acesso negado.")
        } else {
            toast.warning("Certeza que deseja deletar esse convidado?", {
                action: {
                    label: "Sim",
                    onClick: async () => {
                        const result = await deletarConvidado(id)
                        const toastId = toast.loading("Deletando...")
                        if (!result.success) {
                            toast.error("Erro ao atualizar.", {
                                description: result.mensagem
                            })
                        }
                        toast.success("Deletado com sucesso!", { id: toastId })
                        router.refresh()
                        return result
                    }
                },
                cancel: {
                    label: "Cancelar",
                    onClick: () => { }
                }
            })
        }
    }

    async function verConvidado() {
        const usuario = await dadoUsuario()

        if (usuario.role === "ADMIN") {
            router.push(`/admin/convidados/${id}`)
        } else {
            router.push(`/recep/convidados/${id}`)
        }
    }

    async function marcarPresenca() {
        toast.warning("Quer marcar a presença desse convidado?", {
            action: {
                label: "Sim",
                onClick: async () => {
                    const toastId = toast.loading("Marcando presença...")
                    const result = await checkinConvidado(id)
                    if (!result.success) {
                        toast.error("Erro ao marcar presença.", {
                            description: result.mensagem,
                            id: toastId
                        })
                        return
                    }
                    toast.success("Atualizado com sucesso.", { id: toastId })
                    router.refresh()
                }
            },
            cancel: {
                label: "Cancelar",
                onClick: () => { }
            }
        })
    }

    const usuarioCheck = presenca === true ? "bg-green-700" : ""

    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={marcarPresenca} className={usuarioCheck}>
                <Check />
            </Button>
            <Button size="sm" variant="outline" onClick={verConvidado}>
                <Eye />
            </Button>
            <Button size="sm" variant="destructive" onClick={deletar}>
                <Trash />
            </Button>
        </div >
    )
}

export const columnConvidado: ColumnDef<Convidado>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "sobrenome",
        header: "Sobrenome",
    },
    {
        accessorKey: "cpf",
        header: "Cpf",
    },
    {
        accessorKey: "telefone",
        header: "Telefone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "numero_mesa",
        header: "Numero da Mesa",
    },
    {
        accessorKey: "presenca",
        header: "Presente ?",
        cell: ({ row }) => (
            <span>{row.original.presenca ? 'Presente' : "Não Presente"}</span>
        )
    },
    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <AcoesConvidado id={row.original.id} presenca={row.original.presenca} />
                    <DialogAtualizarConvidado
                        id={row.original.id}
                        dados={{
                            nome: row.original.nome,
                            sobrenome: row.original.sobrenome,
                            cpf: row.original.cpf,
                            telefone: row.original.telefone,
                            email: row.original.email,
                            numero_mesa: row.original.numero_mesa
                        }}
                    />
                </div>
            )
        }
    }
]