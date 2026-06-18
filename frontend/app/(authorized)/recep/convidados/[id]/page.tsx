import { buscarConvidado } from "@/actions/convidados";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function VerConvidado({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const convidado = await buscarConvidado(id)

    return (
        <div className={cn("flex items-center justify-center p-6")}>
            <Card className="w-full max-w-md">
                <CardHeader className="border-b pb-4">
                    <CardTitle>
                        {convidado.nome} {convidado.sobrenome}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                        <h1>CPF: {convidado.cpf}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Telefone: {convidado.telefone}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Email: {convidado.email}</h1>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <h1>Numero da Mesa: {convidado.numero_mesa}</h1>
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