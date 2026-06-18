import { listarUsuarios } from "@/actions/usuarios";
import { columnUsuario } from "@/components/columsUsuario";
import { DataTable } from "@/components/data-table";
import { DialogCriarUsuario } from "@/components/dialog-criar-usuario";

export default async function Usuarios() {
    const usuarios = await listarUsuarios()

    return (
        <div className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Usuários</h1>
                <DialogCriarUsuario />
            </div>
            <DataTable columns={columnUsuario} data={usuarios} />
        </div>
    )
}