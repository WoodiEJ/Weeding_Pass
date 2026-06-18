'use client'

import { criarUsuario } from "@/actions/usuarios"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const schema = z.object({
    nome: z.string().min(6, "Nome inválido."),
    cpf: z.string().min(11).max(14, "Cpf inválido."),
    email: z.string().email("Email inválido."),
    senha: z.string().min(6, "Senha não pode estar vazio."),
    role: z.enum(["ADMIN", "RECEP"], "Role inválido.")
})

type FormData = z.infer<typeof schema>

export function DialogCriarUsuario() {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const onSubmit = async (data: FormData) => {
        toast.warning("Confirme a criação", {
            action: {
                label: "Confirmar",
                onClick: async () => {
                    const toastId = toast.loading("Atualizando...")
                    const result = await criarUsuario(data)
                    if (result.success) {
                        toast.success("Atualizado com sucesso.", { id: toastId })
                    } else {
                        toast.error(result.mensagem, { id: toastId })
                    }
                }
            },
            cancel: {
                label: "Cancelar",
                onClick: () => { }
            }
        })
    }

    return (
        <Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogTrigger asChild>
                    <Button>Criar Usuario Novo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader className="border-b pb-5">
                        <DialogTitle>Criar Usuario Novo</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>Nome</Label>
                            <Input id="nome" {...register("nome")} />
                        </Field>
                        <Field>
                            <Label>Cpf</Label>
                            <Input id="cpf"  {...register("cpf")} />
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input id="email" {...register("email")} />
                        </Field>
                        <Field>
                            <Label>Senha</Label>
                            <Input id="senha" {...register("senha")} />
                        </Field>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Administrador (a)</SelectItem>
                                        <SelectItem value="RECEP">Recepcionista</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Criar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
