import { mockItems } from "@/features/items/data/mockItems";
import { Item } from "@/features/items/types/item";

export function getAllItems(): Item[] {
  return mockItems;
}

export function getItemBySlug(slug: string): Item | undefined {
  return mockItems.find((item) => item.slug === slug);
}
