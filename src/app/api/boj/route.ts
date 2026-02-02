import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");

  if (!handle) {
    return NextResponse.json(
      { error: "handle parameter is required" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://solved.ac/api/v3/user/show?handle=${handle}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // 1시간 캐싱
      }
    );

    if (!res.ok) {
      throw new Error(`solved.ac API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("BOJ API proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch BOJ stats" },
      { status: 500 }
    );
  }
}
