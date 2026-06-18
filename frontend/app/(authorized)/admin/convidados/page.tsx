import { listarConvidados } from "@/actions/convidados";
import { columnConvidado } from "@/components/columnsConvidado";
import { DataTable } from "@/components/data-table";
import { DialogCriarConvidado } from "@/components/dialog-criar-convidado";

export default async function Convidados() {
    const convidados = await listarConvidados()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Convidados</h1>
                <DialogCriarConvidado />
            </div>
            <DataTable columns={columnConvidado} data={convidados} />
        </div>
    )
}