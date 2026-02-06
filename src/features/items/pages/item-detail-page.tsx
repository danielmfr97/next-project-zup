import Image from "next/image";
import { notFound } from "next/navigation";
import { lazy, Suspense } from "react";
import { getItemBySlug } from "@/features/items/utils/items";
import styles from "./item-detail-page.module.css";

type ItemDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const ItemExtraDetails = lazy(
  () => import("@/features/items/components/item-extra-details")
);

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  const generatedAt = new Date().toLocaleString("pt-BR");

  if (!item) {
    notFound();
  }

  return (
    <main id="conteudo" className={styles.container}>
      
      <article className={styles.content} aria-labelledby="item-titulo">
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={item.imageUrl}
            alt={`Imagem detalhada do item ${item.title}`}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            priority
          />
        </div>
        
        <section className={styles.info}>
          <p className={styles.category}>{item.category}</p>
          <h1 id="item-titulo">{item.title}</h1>
          <p className={styles.description}>{item.fullDescription}</p>
          
          <div className={styles.priceContainer}>
            <span className={styles.priceLabel}>Preço:</span>
            <p className={styles.price}>
              R$ <strong>{item.price.toFixed(2)}</strong>
            </p>
          </div>
          
          <p className={styles.generatedAt}>
            Página atualizada em: <time>{generatedAt}</time>
          </p>
          
          <Suspense
            fallback={
              <div 
                role="status" 
                aria-live="polite"
                aria-label="Carregando informações adicionais"
              >
                <p className={styles.loadingExtra}>
                  Carregando informações adicionais...
                </p>
              </div>
            }
          >
            <ItemExtraDetails slug={item.slug} />
          </Suspense>
        </section>
      </article>
    </main>
  );
}