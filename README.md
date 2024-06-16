<a>
  <h1 align="center">Read Realm</h1>
</a>

<br/>

## UI

Inspiração: BookBase - Digital Book Library Dashboard by [Kazeem Adebola Idris
](https://dribbble.com/pkaidris)

![Imagem](./public/ui-inspiration.png)

## Clone e rode localmente

1. Primeiro você vai precisar de um projeto Supabase que pode ser feito [pela dashboard do Supabase](https://database.new)

2. Use `cd` para entrar no diretório da aplicação

   ```bash
   cd read-realm
   ```

3. Renomeie `.env.local.example` to `.env` e atualize as seguintes variáveis

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   DATABASE_URL=[INSERT SUPABASE CONNECTION STRING]
   ```

   Ambas `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` podem ser encontradas nas [configurações de API do seu projeto Supabase](https://app.supabase.com/project/_/settings/api)

4. Agora, você pode rodar o projeto Next.js localmente com o seu servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação deve estar rodando em: [localhost:3000](http://localhost:3000/).

## Fundamentos de Next.js

Alguns fundamentos importantes para entender do Next.js:

- https://www.youtube.com/watch?v=6JnkwfrAI-U&t=725s
- https://www.youtube.com/watch?v=DAd01mYiURo
