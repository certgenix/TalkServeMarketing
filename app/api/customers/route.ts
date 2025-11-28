import { NextResponse } from 'next/server';

const LIST_CUSTOMERS_URL = 'https://us-central1-talkserve.cloudfunctions.net/listCustomers';

export async function GET() {
  try {
    const response = await fetch(LIST_CUSTOMERS_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch customers' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
