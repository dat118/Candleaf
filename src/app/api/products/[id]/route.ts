import { NextResponse } from "next/server";
import products from "../data.json";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const productById = products.find((product) => product.id === Number(id));
  return NextResponse.json(productById);
}
