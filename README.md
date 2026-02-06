
# Mini Aplicação Next.js - Catálogo de Produtos

## 📋 Sobre o Projeto
Aplicação web desenvolvida com **Next.js 14+ (App Router)** que demonstra a integração de conceitos fundamentais de desenvolvimento web moderno, incluindo diferentes estratégias de renderização, gerenciamento de estado, API Routes e boas práticas de acessibilidade.

---

## 🎯 Funcionalidades Implementadas

### Página Catálogo (`/catalogo`)
* ✅ Listagem de produtos com **SSG (Static Site Generation)**.
* ✅ Dados mockados de 5+ produtos.
* ✅ Cards responsivos com título, descrição e imagem.
* ✅ Redirecionamento automático da home (`/`) para `/catalogo`.

### Página Detalhe do Produto (`/catalogo/[slug]`)
* ✅ Rota dinâmica com slug.
* ✅ Renderização **ISR (Incremental Static Regeneration)** com revalidação de 60s.
* ✅ Exibição completa dos detalhes do produto.
* ✅ Formatação de preço em Real (BRL).

### Página Perfil do Usuário (`/perfil`)
* ✅ Renderização **CSR (Client-Side Rendering)**.
* ✅ Autenticação simulada via **Context API**.
* ✅ Edição de dados do usuário (nome e email).
* ✅ Proteção de rota (redireciona se não autenticado).

### API Routes
* ✅ `GET /api/items` - Listagem completa de produtos.
* ✅ `GET /api/items/[slug]` - Detalhes de produto específico.
* ✅ Dados mockados no backend com TypeScript.

### Componentes e Layout
* ✅ Header global com navegação contextual.
* ✅ Botão "LOGAR" posicionado à direita quando não autenticado.
* ✅ Link "Perfil" visível apenas para usuários autenticados.
* ✅ **Skip link** para acessibilidade.

---

## 🏗️ Decisões Técnicas

### Estratégias de Renderização

#### SSG (Static Site Generation) - `/catalogo`
```tsx
// app/catalogo/page.tsx
export default async function CatalogoPage() {
  const items = await getItems(); // Dados gerados em build time
  return <ItemList items={items} />;
}
```
teste