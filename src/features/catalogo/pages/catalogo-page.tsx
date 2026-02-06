// src/features/catalogo/pages/catalogo-page.tsx
"use client";

import { ItemCard } from "@/features/catalogo/components/item-card";
import { getAllItems } from "@/features/items/utils/items";
import styles from "./catalogo-page.module.css";

export default function CatalogoPage() {
  const items = getAllItems();

  return (
    <main id="conteudo" className={styles.container}>
      <section className={styles.hero} aria-labelledby="catalogo-titulo">
        <h1 id="catalogo-titulo">Catálogo de Itens Fictícios</h1>
        <p>
          Listagem estática de produtos para demonstrar SSG com Next.js,
          TypeScript e React.
        </p>
      </section>

      <section aria-label="Lista de produtos">
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.id} className={styles.gridItem}>
              <ItemCard item={item} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
