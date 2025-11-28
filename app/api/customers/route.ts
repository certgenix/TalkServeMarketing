import { NextRequest, NextResponse } from "next/server";

const LIST_CUSTOMERS_URL = "https://listcustomers-ieskeqprjq-uc.a.run.app";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(LIST_CUSTOMERS_URL, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch customers" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
