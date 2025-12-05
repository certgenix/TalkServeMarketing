import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const LIST_CUSTOMERS_URL = "https://listcustomersforsms-ieskeqprjq-uc.a.run.app";

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
    url.searchParams.set("type", "SMS agent");
    url.searchParams.set("limit", "20");

    console.log("Fetching SMS customers from:", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      
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
        { success: false, error: "Failed to fetch SMS customers" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching SMS customers:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
