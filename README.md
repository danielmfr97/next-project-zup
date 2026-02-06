# Mini Aplicação Next.js - Catálogo de Produtos

##  Funcionalidades Implementadas

### Página Catálogo (`/catalogo`)
-  Listagem de produtos com SSG (Static Site Generation)
-  Dados mockados de 6 produtos
-  Cards responsivos com título, descrição curta e imagem
-  Redirecionamento automático da home (`/`) para `/catalogo`
-  Layout responsivo com Grid CSS (1 coluna mobile, 2 tablet, 3 desktop)

### Página Detalhe do Produto (`/item/[slug]`)
-  Rota dinâmica com slug
-  Renderização ISR (Incremental Static Regeneration) com revalidação de 60s
-  Exibição completa dos detalhes do produto
-  Formatação de preço em Real (BRL)
-  Botão de voltar para catálogo
-  Carregamento assíncrono de dados adicionais via API

### Página Perfil do Usuário (`/perfil`)
-  Renderização CSR (Client-Side Rendering)
-  Autenticação simulada via Context API
-  Edição de dados do usuário (nome e email)
-  Proteção de rota (redireciona se não autenticado)
-  Persistência de estado durante a sessão

### API Routes
-  `GET /api/items` - Listagem completa de produtos
-  `GET /api/items/[slug]` - Detalhes de produto específico
-  Dados mockados no backend com TypeScript
-  Simulação de latência (1.5s) para demonstrar loading states

### Componentes e Layout
-  Header global com navegação contextual
-  Botão "LOGAR" posicionado à direita quando não autenticado
-  Link "Perfil" visível apenas para usuários autenticados
-  Skip link para acessibilidade
-  Componentes reutilizáveis e bem estruturados

## 🏗️ Decisões Técnicas

### Estratégias de Renderização

#### SSG (Static Site Generation) - `/catalogo`
```tsx
// app/catalogo/page.tsx
"use client";
import { getAllItems } from "@/features/items/utils/items";

export default function CatalogoPage() {
  const items = getAllItems();
  return (
    <main id="conteudo">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <ItemCard item={item} />
          </li>
        ))}
      </ul>
    </main>
  );
}
```
**Justificativa:**
- Para uma página de menu de vedas o SSG seria o ideal e mais performático, pois o HTML é gerado no momento de build e o servidor envia o arquivo pronto. Logo o navegador não precisa esperar o JS carregar para mostar a lista de produtos.
- Apresenta a vantagem do SEO, já que o conteúdo que chega ao buscador está em HTML.
- Se a minha página crescer para um número de 100 mil acessos o custo de usar o SSG continua baixo, pois estamos apenas entregando um arquivo estático.


#### ISR (Incremental Static Regeneration) - `/item/[slug]`
```tsx
// app/item/[slug]/page.tsx
export const revalidate = 60; // Revalidação a cada 60 segundos

export default async function ItemDetailPage({ params }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  
  return <ItemDetail item={item} />;
}
```
**Justificativa:**
- Combina benefícios de SSG com atualizações periódicas
- Página é regenerada a cada 60 segundos, para o next verificar se houve mudanças e atualizar a página em segundo plano sem necessidade de redeploy

#### CSR (Client-Side Rendering) - `/perfil`
```tsx
// app/perfil/page.tsx
"use client";
import { useAuth } from "@/features/auth/context/auth-context";
import { useState } from "react";

export default function PerfilPage() {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState({ name: "", email: "" });
  
  if (!isAuthenticated) {
    return <redirect to="/catalogo" />;
  }
  
  return <UserProfile data={userData} onChange={setUserData} />;
}
```
**Justificativa:**
- Conteúdo personalizado por usuário
- Ideal para páginas privadas e dashboard de areas logadas
- Requer interatividade em tempo real
- Dados sensíveis (perfil) não devem ser pré-renderizados
##  Estratégia de Estilização

### CSS Modules
```css
/* app/catalogo/page.module.css */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 700px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```
**Justificativa:**
- Escopo local: Evita conflitos de nomes CSS
- Performance: CSS é carregado apenas quando necessário
- Manutenibilidade: Fácil rastrear estilos por componente

### Responsividade com Flexbox e Grid
```css
/* Layout responsivo */
.content {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .content {
    grid-template-columns: 1.1fr 1fr;
    align-items: start;
  }
}
```

## Como Executar

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
# Acesse http://localhost:3000
```

### Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```