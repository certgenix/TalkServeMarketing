import { NextRequest, NextResponse } from "next/server";

const GET_CONVERSATIONS_URL =
  "https://getconversations-ieskeqprjq-uc.a.run.app";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 },
      );
    }

    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(`${GET_CONVERSATIONS_URL}?phone=${phone}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch conversations" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
