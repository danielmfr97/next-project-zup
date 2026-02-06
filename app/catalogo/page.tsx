// app/catalogo/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ItemCard } from "@/components/item-card";
import { getAllItems } from "@/features/items/utils/items";
import { useAuth } from "../contexts/auth-context";
import styles from "./page.module.css";

export default function CatalogoPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const items = getAllItems();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Ou um loading
  }

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