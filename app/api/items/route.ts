import { NextResponse } from "next/server";
import { getAllItems } from "@/features/items/utils/items";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const items = getAllItems();

  return NextResponse.json(items);
}
