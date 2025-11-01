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

    const projectId = process.env.VOICEFLOW_PROJECT_ID;
    if (!projectId) {
      console.error('VOICEFLOW_PROJECT_ID is not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Format phone number to E.164 format (add + if not present)
    let formattedPhone = phoneNumber.replace(/\s/g, '');
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = '+' + formattedPhone;
    }

    console.log('Initiating call to:', formattedPhone);
    
    const response = await fetch(
      `https://runtime-api.voiceflow.com/v1alpha1/phone-number/${projectId}/outbound`,
      {
        method: 'POST',
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formattedPhone,
          variables: {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
          },
        }),
      }
    );

    console.log('VoiceFlow API response status:', response.status);
    
    const responseText = await response.text();
    console.log('VoiceFlow API response:', responseText);

    if (!response.ok) {
      console.error('VoiceFlow API error:', responseText);
      return NextResponse.json(
        { success: false, error: 'Failed to initiate call' },
        { status: response.status }
      );
    }

    let data = {};
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.warn('Response is not valid JSON:', responseText);
      }
    }
    
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
