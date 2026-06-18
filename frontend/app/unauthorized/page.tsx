import { dadoUsuario } from "@/actions/usuarios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UnauthorizedLogin() {
    const usuario = await dadoUsuario()
    const linkCerto = usuario.role === "RECEP" ? '/recep/dashboard' : '/'

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-6xl font-bold">Acesso negado.</h1>
            <p className="text-muted-foreground">Página não encontrada</p>
            <Link
                href={linkCerto}

            >
                <Button>Voltar</Button>
            </Link>
        </div>
    )
}