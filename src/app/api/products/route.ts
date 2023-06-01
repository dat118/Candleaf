import { NextResponse } from "next/server";
import products from "./data.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("type");
  if (query === "popular") {
    const popularProducts = products.filter((product) => !!product.isPopular);
    return NextResponse.json(popularProducts);
  }
  return NextResponse.json(products);
}
