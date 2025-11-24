import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const data = {
      ownerName: formData.get('ownerName'),
      ownerEmail: formData.get('ownerEmail'),
      businessName: formData.get('businessName'),
      businessDescription: formData.get('businessDescription'),
      services: formData.get('services'),
      industryType: formData.get('industryType'),
      file: formData.get('businessContext'),
    };

    console.log('Onboarding submission received:', {
      ...data,
      file: data.file ? `File: ${(data.file as File).name}` : 'No file uploaded',
    });

    return NextResponse.json({
      success: true,
      message: 'Onboarding submission received successfully',
    });
  } catch (error) {
    console.error('Error processing onboarding:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process onboarding submission' },
      { status: 500 }
    );
  }
}
