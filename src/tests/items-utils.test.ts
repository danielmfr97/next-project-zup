import { describe, expect, it } from "vitest";
import { getAllItems, getItemBySlug } from "@/features/items/utils/items";

describe("items utils", () => {
  it("returns at least five items", () => {
    const items = getAllItems();
    expect(items.length).toBeGreaterThanOrEqual(5);
  });

  it("returns item when slug exists", () => {
    const item = getItemBySlug("mochila-urbana-pro");
    expect(item?.title).toBe("Mochila Urbana Pro");
  });

  it("returns undefined when slug does not exist", () => {
    const item = getItemBySlug("slug-inexistente");
    expect(item).toBeUndefined();
  });
});
