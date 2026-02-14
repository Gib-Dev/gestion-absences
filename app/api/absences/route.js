import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/lib/auth";
import { z } from "zod";

// Validation schemas
const absenceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  date: z.string().refine((date) => {
    const parsed = new Date(date);
    return !isNaN(parsed.getTime());
  }, 'Date must be valid'),
  reason: z.string().min(1, 'Reason is required').max(500, 'Reason too long'),
});

const deleteSchema = z.object({
  id: z.number().int().positive('Invalid ID'),
});

// Helper function to authenticate user
function authenticateUser(req) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No valid authorization header');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    return decoded;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// Get all absences (with pagination)
export async function GET(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    
    // Validate pagination
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({
        success: false,
        error: 'Invalid pagination parameters'
      }, { status: 400 });
    }

    // Build query with Supabase
    let query = supabase
      .from('Absence')
      .select('id, name, date, reason, createdAt, updatedAt')
      .order('createdAt', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    // Add search if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,reason.ilike.%${search}%`);
    }

    // Execute query
    const { data: absences, error: absencesError } = await query;

    if (absencesError) {
      console.error('Supabase error:', absencesError);
      throw new Error(absencesError.message);
    }

    // Get total count
    const { count: total, error: countError } = await supabase
      .from('Absence')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('Count error:', countError);
      throw new Error(countError.message);
    }

    return NextResponse.json({
      success: true,
      absences: absences || [],
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error in GET /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Create new absence
export async function POST(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    const body = await req.json();
    
    // Validate input
    const validationResult = absenceSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { name, date, reason } = validationResult.data;

    // Create new absence with Supabase
    const { data: newAbsence, error } = await supabase
      .from('Absence')
      .insert({
        name,
        date: new Date(date).toISOString(),
        reason,
        userId: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Absence created successfully',
      absence: newAbsence,
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Update absence
export async function PUT(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    const body = await req.json();
    
    // Validate input
    const validationResult = absenceSchema.extend({
      id: z.number().int().positive('Invalid ID'),
    }).safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { id, name, date, reason } = validationResult.data;

    // Check if absence exists and belongs to user
    const { data: existingAbsence, error: findError } = await supabase
      .from('Absence')
      .select('*')
      .eq('id', id)
      .eq('userId', user.id)
      .single();

    if (findError || !existingAbsence) {
      return NextResponse.json({
        success: false,
        error: 'Absence not found or access denied'
      }, { status: 404 });
    }

    // Update absence
    const { data: updatedAbsence, error: updateError } = await supabase
      .from('Absence')
      .update({
        name,
        date: new Date(date).toISOString(),
        reason,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Absence updated successfully',
      absence: updatedAbsence,
    });
  } catch (error) {
    console.error('Error in PUT /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}

// Delete absence
export async function DELETE(req) {
  try {
    // Authenticate user
    const user = authenticateUser(req);
    
    const body = await req.json();
    
    // Validate input
    const validationResult = deleteSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        success: false,
        error: 'Invalid input data',
        details: validationResult.error.errors
      }, { status: 400 });
    }

    const { id } = validationResult.data;

    // Check if absence exists and belongs to user
    const { data: existingAbsence, error: findError } = await supabase
      .from('Absence')
      .select('*')
      .eq('id', id)
      .eq('userId', user.id)
      .single();

    if (findError || !existingAbsence) {
      return NextResponse.json({
        success: false,
        error: 'Absence not found or access denied'
      }, { status: 404 });
    }

    // Delete absence
    const { error: deleteError } = await supabase
      .from('Absence')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      throw new Error(deleteError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Absence deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/absences:', error);
    
    if (error.message.includes('authorization') || error.message.includes('token')) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    }, { status: 500 });
  }
}
