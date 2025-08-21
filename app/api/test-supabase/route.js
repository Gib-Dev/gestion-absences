import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log('🧪 Testing Supabase connection...');
    
    // Test simple de connexion
    const { data, error } = await supabase
      .from('User')
      .select('count(*)', { count: 'exact', head: true });
    
    console.log('🧪 Supabase test result:', { data, error });
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection successful',
      data: data
    });
    
  } catch (error) {
    console.error('❌ Supabase test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Supabase connection failed',
      message: error.message
    }, { status: 500 });
  }
}
