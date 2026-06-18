import { buscarUsuario } from "@/actions/usuarios"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";

export default async function VerUsuario({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const usuario = await buscarUsuario(id)

    return (
        <div className={cn("flex items-center justify-center p-6")}>
            <Card className="w-full max-w-md">
                <CardHeader className="border-b pb-4">
                    <CardTitle>
                        {usuario.nome}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                        <h1>CPF: {usuario.cpf}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Email: {usuario.email}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Role: {usuario.role}</h1>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link href={"/admin/usuarios"}>
                        <Button>Voltar</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}