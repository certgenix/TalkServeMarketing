import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, firstName, lastName, email } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.VOICEFLOW_DM_API_KEY;
    if (!apiKey) {
      console.error('VOICEFLOW_DM_API_KEY is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://runtime-api.voiceflow.com/v1alpha1/phone-number/6902ebd8bcc0c2e54603a7f6/outbound',
      {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          variables: {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('VoiceFlow API error:', errorData);
      return NextResponse.json(
        { success: false, error: 'Failed to initiate call' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Call initiated successfully',
      data 
    });
  } catch (error) {
    console.error('Outbound call error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}
