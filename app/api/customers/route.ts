import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const LIST_CUSTOMERS_URL = "https://listcustomers-ieskeqprjq-uc.a.run.app";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 },
      );
    }

    const url = new URL(LIST_CUSTOMERS_URL);
    url.searchParams.set("uid", uid);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404 || response.status === 403) {
        return NextResponse.json({
          success: true,
          data: [],
          pagination: {
            totalReturned: 0,
            hasMore: false,
            nextStartAfter: null,
          },
        });
      }
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
