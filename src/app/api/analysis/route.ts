import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Analysis ID required' }, 
        { status: 400 }
      );
    }

    // Fetch data from Supabase
    const { data: analysis, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({
      imageData: analysis.image_data,
      analysis: analysis.analysis_text
    });
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analysis' }, 
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Validate request body
    const body = await req.json();
    
    if (!body.imageData || !body.analysis) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert data into Supabase
    const { data: analysis, error } = await supabase
      .from('analyses')
      .insert([
        {
          image_data: body.imageData,
          analysis_text: body.analysis,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    if (!analysis) {
      throw new Error('No data returned from Supabase');
    }

    return NextResponse.json({ id: analysis.id });
  } catch (error) {
    console.error('Error storing analysis:', error);
    return NextResponse.json(
      { error: 'Failed to store analysis' },
      { status: 500 }
    );
  }
} 