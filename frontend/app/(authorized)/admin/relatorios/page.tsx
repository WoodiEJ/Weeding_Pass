import { listarConvidados } from "@/actions/convidados";
import { BotaoGerarRelatorio } from "@/components/pdfBtn";


export default async function Relatorios() {
    const convidados = await listarConvidados()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Relátorio</h1>
                <BotaoGerarRelatorio convidados={convidados} />
            </div>
        </div>
    )
}