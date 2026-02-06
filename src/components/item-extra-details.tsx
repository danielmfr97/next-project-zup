"use client";

import { useEffect, useState } from "react";
import styles from "./item-extra-details.module.css";

type ItemApiResponse = {
  category: string;
};

type ItemExtraDetailsProps = {
  slug: string;
};

export default function ItemExtraDetails({ slug }: ItemExtraDetailsProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadItem() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/items/${slug}`);
        if (!response.ok) {
          throw new Error("Falha ao carregar item");
        }
        const data: ItemApiResponse = await response.json();
        if (isMounted) {
          setCategory(data.category);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadItem();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <p className={styles.loading} role="status" aria-live="polite">
        Buscando dados da API...
      </p>
    );
  }

  return (
    <aside className={styles.box} aria-label="Informações adicionais do item">
      <h2>Dicas rápidas</h2>
      <ul>
        <li>Entrega simulada para todo o Brasil.</li>
        <li>Categoria do item: {category ?? "não disponível"}.</li>
        <li>Garantia fictícia de 12 meses.</li>
      </ul>
    </aside>
  );
}
