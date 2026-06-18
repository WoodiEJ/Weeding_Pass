import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt';
import { fakerPT_BR } from "@faker-js/faker";
import { cpf } from "cpf-cnpj-validator";

async function main() {
    console.log("Seeding iniciando")
    await prisma.convidados.deleteMany() 
    await prisma.usuarios.deleteMany() 

    const senhaCript = await bcrypt.hash("123456", 10)

    console.log("Criando Admin e Recepcionista")
    await prisma.usuarios.create({
        data: {
            nome: fakerPT_BR.person.fullName(),
            cpf: "123.456.789-00",
            email: "admin@email.com",
            senha: senhaCript,
            role: "ADMIN"
        }
    })

    await prisma.usuarios.create({
        data: {
            nome: fakerPT_BR.person.fullName(),
            cpf: "132.456.789-00",
            email: "recep@email.com",
            senha: senhaCript,
            role: "RECEP"
        }
    })

    const convidados = Array.from({ length: 30 }, () => ({
        nome: fakerPT_BR.person.firstName(),
        sobrenome: fakerPT_BR.person.lastName(),
        cpf: cpf.generate(),
        telefone: fakerPT_BR.phone.number(),
        email: fakerPT_BR.internet.email(),
        numero_mesa: fakerPT_BR.number.int({ min: 1, max: 30 }),
        presenca: fakerPT_BR.datatype.boolean()
    }))

    console.log("Inserindo convidados fakes...")
    await prisma.convidados.createMany({ data: convidados })
    
    console.log("Seed completo.")
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})