# Weeding Pass

## Descrição do projeto

O Weeding Pass é uma aplicação web que auxilia com a organizamento do casamento, ajudando com o controle dos convidados. Assim marcando os presentes, os convidados totais e os ausentes. E isso tudo sincronizado com a api dando informações em tempo real.

## Tecnologias Usadas

### Ambiente

- Node.js 24.16.0
- npm 11.16.0
- MySql 8.4

### Back-End

- TypeScript
- Node.js
- Faker-Js
- Prisma
- Bcrypt
- Cors
- Cpf-Cnpj-Validator
- Express
- JsonWebToken (JWT)
- Tsx
- dotenv
- Ulid
- zod

### Front-End

- TypeScript
- jspdf
- jspdf-autotable
- Sonner
- Zod
- React-Hook-Form
- hookform/resovlers
- Lucide
- Recharts
- React Icons
- Shadcn UI
- Tailwind CSS
- Next.js

### Banco de Dados

- MySQL
- MySQL Workbench
- Prisma ORM
- Prisma Studio

### Ferramentas de Desenvolvimento

- Visual Studio Code
- Git 
- Postman
- Figma

### Pré-requisitos

Antes de executar o projeto, certifique-se que tenha baixado e instalado:

- Node.js 24.^
- MySql 8.4.^
- Git

### Prótotipo Figma: 

Você pode acessar o protótipo do sistema pelo link a seguir: (https://www.figma.com/design/wFdOjmHFXOIKlCBXhqYCzy/Weeding-Pass?node-id=10-23&p=f&t=7JsIul6Uz1lfu6zO-0)


### Instruções de Instalação e Execução:
### Clonar o repositorio

```bash
git clone https://github.com/WoodiEJ/Weeding_Pass.git
```

```bash
cd Weeding_Pass
```

### Configuração do Banco de Dados

1. Criar um banco de dados no MySQL.
2. Configurando as seguintes variáveis no Backend:
    DATABASE_URL="mysql://username:password@localhost:3306/mydb"
    DATABASE_USER="username"
    DATABASE_PASSWORD="password"
    DATABASE_NAME="mydb"
    DATABASE_HOST="localhost"
    DATABASE_PORT=3306
    JWT_SECRET="suaChaveSecreta"

### Executando o Back-End

```bash
cd backend
```
- Instalando as depedencias...
```bash
npm install
```

- Gerando o Prisma e conectando com o banco...
```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```

- Populando o banco com dados (fakes)...
```bash
npm run seed
```

- Iniciando o servidor
```bash
npm run dev
```


Endereço padrão da API:

```txt
http://localhost:3001
```

### Executando o Front-End

Em outro terminal, acesse a pasta do front end
```bash
cd frontend
```

- Instale as depedencias
```bash
npm install
```

- Configure o arquivo `.env` relacionando a url do backend ao variavel...
```bash
NEXT_PUBLIC_API_URL=''
```

- Iniciando o Front-End...
```bash
npm run dev
```

- Endereço padrão: 
```txt
http://localhost:3000
```

## Rotas da Aplicação
### Autenticação
- `/login` (POST): Autentica um usuario do sistema.

### Usuários

- `/usuarios` (GET): Lista todos os usuarios do sistema
- `/usuarios/{id}` (GET): Procura um usuario especifico
- `/usuarios/criar` (POST): Crie um usuario novo
- `/usuarios/{id}` (PUT): Atualize dados de um usuario
- `/usuarios/{id}` (DELETE): Exclui um usuario

### Convidados

- `convidados` (GET): Lista todos os convidados do sistema
- `convidados/{id}` (GET): Busce um convidado especifico
- `convidados/registrar` (POST): Registra um convidado novo
- `convidados/{id}` (PUT): Atualize dados de um convidado
- `convidados/{id}` (DELETE): Exclui um convidado

### Check-In

- `convidados/checkin` (PUT): Marcando presença pro um convidado

### Relátorios

- `/admin/relatorios`: Rota do front que gere um pdf com os convidados