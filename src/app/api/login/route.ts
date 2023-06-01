import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = { email: "dat1182000@gmail.com", token: "fakeToken" };

  return NextResponse.json(response);
}
