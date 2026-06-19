import { listarConvidados } from "@/actions/convidados";
import { columnConvidado } from "@/components/columnsConvidado";
import { columnConvidadoRecep } from "@/components/columnsConvidadoRecep";
import { DataTable } from "@/components/data-table";

export default async function Convidados() {
    const convidados = await listarConvidados()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Usuários</h1>

            </div>
            <DataTable columns={columnConvidadoRecep} data={convidados} />
        </div>
    )
}