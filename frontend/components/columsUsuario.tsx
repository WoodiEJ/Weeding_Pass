"use client"

import { deletarUsuario } from "@/actions/usuarios"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Eye, Trash } from "lucide-react"
import { DialogAtualizarUsuario } from "./dialog-atualizar-usuario"

export type Usuario = {
    id: string
    nome: string
    cpf: string
    email: string
    role: "ADMIN" | "RECEP"
}

export function AcoesUsuario({ id }: { id: string }) {
    const router = useRouter()

    async function deletar() {
        toast.warning("Certeza que deseja deletar o usúario?", {
            action: {
                label: "Sim",
                onClick: async () => {
                    const toastId = toast.loading("Deletando...")
                    const result = await deletarUsuario(id)
                    if (!result.success) {
                        toast.error("Erro ao deletar.", {
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

    async function verUsuario() {
        router.push(`/admin/usuarios/${id}`)
    }

    return (
        <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={verUsuario}>
                <Eye />
            </Button>
            <Button size="sm" variant="destructive" onClick={deletar}>
                <Trash />
            </Button>
        </div>
    )
}

export const columnUsuario: ColumnDef<Usuario>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "cpf",
        header: "Cpf",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "acoes",
        header: "Ações",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <AcoesUsuario id={row.original.id} />
                    <DialogAtualizarUsuario
                        id={row.original.id}
                        dados={{
                            nome: row.original.nome,
                            cpf: row.original.cpf,
                            email: row.original.email,
                            senha: "",
                            role: row.original.role
                        }}
                    />
                </div>
            )
        }
    }
]