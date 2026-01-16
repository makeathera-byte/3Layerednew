import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone } = body;

        // Validate required fields
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert booked call into database
        const { data, error } = await supabase
            .from('booked_calls')
            .insert({
                name,
                email,
                phone,
                status: 'new'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);

            // Check if it's a duplicate key error
            if (error.code === '23505' || error.message?.includes('duplicate') || error.message?.includes('unique')) {
                return NextResponse.json(
                    { error: 'A booking with this email already exists. Please wait for our team to contact you.' },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to book call' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            booking: data
        }, { status: 201 });

    } catch (error) {
        console.error('Book call error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const adminPassword = searchParams.get('password');

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch all booked calls
        const { data, error } = await supabase
            .from('booked_calls')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch booked calls' },
                { status: 500 }
            );
        }

        return NextResponse.json({ bookings: data }, { status: 200 });

    } catch (error) {
        console.error('Fetch booked calls error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { bookingId, status, adminNotes, adminPassword } = body;

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update booked call
        const updateData: any = {};
        if (status) updateData.status = status;
        if (adminNotes !== undefined) updateData.admin_notes = adminNotes;

        const { data, error } = await supabase
            .from('booked_calls')
            .update(updateData)
            .eq('id', bookingId)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to update booked call' },
                { status: 500 }
            );
        }

        return NextResponse.json({ booking: data }, { status: 200 });

    } catch (error) {
        console.error('Update booked call error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const bookingId = searchParams.get('bookingId');
        const adminPassword = searchParams.get('password');

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!bookingId) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }

        // Delete booked call
        const { error } = await supabase
            .from('booked_calls')
            .delete()
            .eq('id', bookingId);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to delete booked call' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Delete booked call error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
