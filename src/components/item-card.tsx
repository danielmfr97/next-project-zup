import Image from "next/image";
import Link from "next/link";
import { Item } from "@/features/items/types/item";
import styles from "./item-card.module.css";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const itemTitleId = `item-title-${item.id}`;

  return (
    <article className={styles.card} aria-labelledby={itemTitleId}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={item.imageUrl}
          alt={`Imagem do produto ${item.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 700px) 50vw, 100vw"
        />
      </div>
      <div className={styles.content}>
        <h2 id={itemTitleId}>{item.title}</h2>
        <p>{item.shortDescription}</p>
        <Link
          className={styles.link}
          href={`/item/${item.slug}`}
          aria-label={`Ver detalhes do item ${item.title}`}
        >
          Ver detalhe
        </Link>
      </div>
    </article>
  );
}
