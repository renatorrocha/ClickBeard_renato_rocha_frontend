# Click Beard Frontend

## Descrição

O Click Beard é uma aplicação web moderna para agendamento de serviços de barbearia, oferecendo uma experiência intuitiva para clientes agendarem seus cortes e tratamentos de barba.

## Tecnologias Principais

### Framework & Biblioteca Principal

- **React 19**: biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: superset tipado de JavaScript
- **Vite 6**: bundler e dev server de alta performance

### UI & Componentes

- **Tailwind CSS 4**: framework CSS utilitário
- **shadcn/ui**: componentes baseados em Radix UI com Tailwind CSS
- **Lucide React**: biblioteca de ícones
- **Sonner**: notificações toast elegantes

### Gerenciamento de Estado & Dados

- **TanStack Query**: biblioteca para gerenciamento de estados assíncronos
- **TanStack Router**: roteador para aplicações React
- **Zustand**: biblioteca leve para gerenciamento de estado
- **Zod**: validação de esquema com TypeScript

### Formulários

- **React Hook Form**: biblioteca para formulários em React
- **@hookform/resolvers**: integrações para validação (Zod)

## Requisitos

- Node.js (versão compatível com as dependências)
- PNPM 10.8.1+ (gerenciador de pacotes)

## Configuração do Ambiente

1. Clone o repositório
2. Crie um arquivo `.env` baseado no `.env.example` com as seguintes variáveis:
   ```
   VITE_API_URL=sua_url_api
   ```

## Como Executar Localmente

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```
3. Acesse a aplicação no navegador:
   ```
   http://localhost:3000
   ```

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento na porta 3000
- `pnpm build`: Compila o TypeScript e constrói a aplicação para produção

## Estrutura do Projeto

- `/src/components`: Componentes React reutilizáveis
- `/src/lib`: Utilitários, stores e configurações
- `/src/routes`: Rotas da aplicação usando TanStack Router
- `/src/assets`: Recursos estáticos (imagens, etc.)
