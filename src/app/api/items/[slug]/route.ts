import { NextResponse } from "next/server";
import { getItemBySlug } from "../../../../features/items/utils/items";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const { slug } = await context.params;
  const item = getItemBySlug(slug);

  if (!item) {
    return NextResponse.json({ message: "Item não encontrado." }, { status: 404 });
  }

  return NextResponse.json(item);
}
