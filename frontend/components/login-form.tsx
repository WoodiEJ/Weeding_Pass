import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { login } from "@/actions/login"
import { toast } from "sonner"
import { dadoUsuario } from "@/actions/usuarios"

const schema = z.object({
  email: z.string().email("Email inválido."),
  senha: z.string().min(6, "Senha curto demais.")
})

type FormData = z.infer<typeof schema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Logando...")
    const res = await login(data.email, data.senha)
    const usuario = await dadoUsuario()

    if (res.success === false) {
      toast.error("Erro ao logar", {
        description: res.mensagem,
        id: toastId
      })
    }
    if (res.success === true) {
      if (usuario.role === "ADMIN") {
        toast.success("Logado com sucesso.", { id: toastId })
        router.push("/admin/dashboard")
      } else {
        toast.success("Logado com sucesso.", { id: toastId })
        router.push("/recep/dashboard")
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem Vindo</CardTitle>
          <CardDescription>
            Logue na sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  required
                />
                <p>{errors.email?.message}</p>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input id="password" type="password" required {...register("senha")} />
                <p>{errors.senha?.message}</p>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
