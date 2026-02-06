import Image from "next/image";
import { notFound } from "next/navigation";
import { lazy, Suspense} from "react";
import { getItemBySlug } from "@/features/items/utils/items";
import styles from "./page.module.css";

type ItemDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;
const ItemExtraDetails = lazy(() => import("@/components/item-extra-details"));

export default async function ItemDetailPage({ params }: ItemDetailPageProps) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  const generatedAt = new Date().toLocaleString("pt-BR");

  if (!item) {
    notFound();
  }

  return (
    <main id="conteudo" className={styles.container}>
      {/* Botão de voltar */}
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
          <p className={styles.price} aria-label={`Preço: ${item.price.toFixed(2)} reais`}>
            R$ {item.price.toFixed(2)}
          </p>
          <p className={styles.generatedAt} aria-label="Momento de geração da página">
            Página gerada em: {generatedAt}
          </p>
          <Suspense
            fallback={
              <p className={styles.loadingExtra} role="status" aria-live="polite">
                Carregando informações adicionais...
              </p>
            }
          >
            <ItemExtraDetails slug={item.slug} />
          </Suspense>
        </section>
      </article>
    </main>
  );
}