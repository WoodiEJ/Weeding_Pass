"use client"

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export function BotaoGerarRelatorio({ convidados }: { convidados: any[] }) {

    function gerarPdf() {
        const documento = new jsPDF();
        documento.setFontSize(18);
        documento.text("Relatório dos Convidados", 14, 20);

        const linhas = convidados.map((c) => [
            c.id, c.nome, c.sobrenome, c.cpf, c.telefone, c.email, c.numero_mesa,
            c.presenca ? 'Presente' : 'Ausente',
        ]);

        autoTable(documento, {
            startY: 35,
            head: [['ID', 'NOME', 'SOBRENOME', 'CPF', 'TELEFONE', 'EMAIL', 'NUMERO DA MESA', 'PRESEÇA']],
            body: linhas
        });

        documento.save('relatorio-convidados.pdf');
        toast.success("Relatório gerado com sucesso.");
    }

    function confirmar() {
        toast.warning("Confirme a geração do PDF.", {
            action: {
                label: "Confirmar",
                onClick: () => gerarPdf()
            },
            cancel: {
                label: "Cancelar",
                onClick: () => { }
            }
        });
    }

    return <Button onClick={confirmar} size="sm">Gerar relatório completo</Button>;
}