'use client'

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
import { toast } from "sonner"
import z from "zod"
import { registrarConvidado } from "@/actions/convidados"
import { useForm } from "react-hook-form"

const schema = z.object({
    nome: z.string().min(3, "Nome inválido."),
    sobrenome: z.string().min(3, "Sobrenome inválido."),
    cpf: z.string().min(11).max(14, "Cpf inválido."),
    telefone: z.string().min(10).max(15, "Telefone inválido."),
    email: z.string().email("Email inválido."),
    numero_mesa: z.number().positive("Numero inválido.")
})

type FormData = z.infer<typeof schema>

export function DialogCriarConvidado() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
    const onSubmit = async (data: FormData) => {
        toast.warning("Confirme a atualização", {
            action: {
                label: "Confirmar",
                onClick: async () => {
                    const toastId = toast.loading("Registrando...")
                    const result = await registrarConvidado(data)
                    if (result.success) {
                        toast.success("Convidado registrado com sucesso.", { id: toastId })
                        return result
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

            <DialogTrigger asChild>
                <Button>Registrar Novo Convidado</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="border-b pb-5">
                        <DialogTitle>Criar Convidado</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>Nome</Label>
                            <Input id="nome" {...register("nome")} />
                            <p>{errors.nome?.message}</p>
                        </Field>
                        <Field>
                            <Label>Sobrenome</Label>
                            <Input id="sobrenome" {...register("sobrenome")} />
                            <p>{errors.sobrenome?.message}</p>
                        </Field>
                        <Field>
                            <Label>Cpf</Label>
                            <Input id="cpf" {...register("cpf")} />
                            <p>{errors.cpf?.message}</p>
                        </Field>
                        <Field>
                            <Label>Telefone</Label>
                            <Input id="telefone" {...register("telefone")} />
                            <p>{errors.telefone?.message}</p>
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input id="email" {...register("email")} />
                            <p>{errors.email?.message}</p>
                        </Field>
                        <Field>
                            <Label>Numero Da Mesa</Label>
                            <Input id="numero_mesa" {...register("numero_mesa", { valueAsNumber: true })} />
                            <p>{errors.numero_mesa?.message}</p>
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Registrar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
