import { NextRequest, NextResponse } from "next/server";

const GET_CHAT_SESSIONS_URL =
  "https://us-central1-talkserve.cloudfunctions.net/getChatSessions";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customer = searchParams.get("customer");

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer phone number is required" },
        { status: 400 },
      );
    }

    const url = new URL(GET_CHAT_SESSIONS_URL);
    url.searchParams.set("customer", customer);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          success: true,
          customer: customer,
          sessions: [],
          pagination: {
            returned: 0,
            hasMore: false,
            nextStartAfter: null,
          },
        });
      }
      return NextResponse.json(
        { success: false, error: "Failed to fetch chat sessions" },
        { status: response.status },
      );
    }

    const data = await response.json();
    
    if (data.success === false) {
      return NextResponse.json({
        success: true,
        customer: customer,
        sessions: [],
        pagination: {
          returned: 0,
          hasMore: false,
          nextStartAfter: null,
        },
      });
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
