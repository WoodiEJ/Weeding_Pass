import { atualizarUsuario } from "@/actions/usuarios"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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
import { useRouter } from "next/navigation"

const schema = z.object({
    nome: z.string().min(6, "Nome inválido."),
    cpf: z.string().min(11).max(14, "Cpf inválido."),
    email: z.string().email("Email inválido."),
    senha: z.string().min(6, "Senha não pode estar vazio."),
    role: z.enum(["ADMIN", "RECEP"], "Role inválido.")
}).partial()

type FormData = z.infer<typeof schema>

export function DialogAtualizarUsuario({ id, dados }: { id: string, dados: FormData }) {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: dados.nome,
            cpf: dados.cpf,
            email: dados.email,
            senha: dados.senha,
            role: dados.role
        }
    })
    const onSubmit = async (data: FormData) => {
        toast.warning("Confirme a atualização", {
            action: {
                label: "Confirmar",
                onClick: async () => {
                    const toastId = toast.loading("Atualizando...")
                    const result = await atualizarUsuario(id, data)
                    if (result.success) {
                        toast.success("Atualizado com sucesso.", { id: toastId })
                        router.refresh()
                        return result
                    } else {
                        toast.error(result.mensagem, { id: toastId })
                        router.refresh()
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
                <Button variant="outline"><Pencil /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="border-b pb-5">
                        <DialogTitle>Editar Usuario</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>Nome</Label>
                            <Input id="nome" {...register("nome")} />
                            <p>{errors.nome?.message}</p>
                        </Field>
                        <Field>
                            <Label>Cpf</Label>
                            <Input id="cpf"  {...register("cpf")} />
                            <p>{errors.cpf?.message}</p>
                        </Field>
                        <Field>
                            <Label>Email</Label>
                            <Input id="email" {...register("email")} />
                            <p>{errors.email?.message}</p>
                        </Field>
                        <Controller
                            control={control}
                            name="role"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o role" />
                                        <p>{errors.role?.message}</p>
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
                        <Button type="submit">Atualizar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
