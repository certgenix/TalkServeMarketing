import { NextRequest, NextResponse } from 'next/server';

const FIREBASE_FUNCTION_URL = 'https://us-central1-talkserve.cloudfunctions.net/onboarding';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    console.log('Onboarding submission received:', {
      ownerName: formData.get('ownerName'),
      ownerEmail: formData.get('ownerEmail'),
      businessName: formData.get('businessName'),
      industryType: formData.get('industryType'),
      file: formData.get('businessContext') ? `File: ${(formData.get('businessContext') as File).name}` : 'No file uploaded',
    });

    const response = await fetch(FIREBASE_FUNCTION_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      } else {
        const errorText = await response.text();
        errorData = { error: errorText };
      }
      
      console.error('Firebase function error:', errorData);
      
      return NextResponse.json(
        { 
          success: false, 
          ...errorData 
        },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      message: 'Onboarding submission received successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error processing onboarding:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to process onboarding submission' 
      },
      { status: 500 }
    );
  }
}
