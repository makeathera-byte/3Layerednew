import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, projectDescription, budgetRange, timeline, address, city, state, pincode, country } = body;

        // Validate required fields
        if (!name || !email || !projectDescription) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert custom request into database
        const { data, error } = await supabase
            .from('custom_requests')
            .insert({
                name,
                email,
                phone,
                project_description: projectDescription,
                budget_range: budgetRange,
                timeline,
                address,
                city,
                state,
                pincode,
                country,
                status: 'new'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to submit custom request' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            request: data
        }, { status: 201 });

    } catch (error) {
        console.error('Custom request error:', error);
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

        // Fetch all custom requests
        const { data, error } = await supabase
            .from('custom_requests')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch custom requests' },
                { status: 500 }
            );
        }

        return NextResponse.json({ requests: data }, { status: 200 });

    } catch (error) {
        console.error('Fetch custom requests error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { requestId, status, adminNotes, adminPassword } = body;

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update custom request
        const updateData: any = {};
        if (status) updateData.status = status;
        if (adminNotes !== undefined) updateData.admin_notes = adminNotes;

        const { data, error } = await supabase
            .from('custom_requests')
            .update(updateData)
            .eq('id', requestId)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to update custom request' },
                { status: 500 }
            );
        }

        return NextResponse.json({ request: data }, { status: 200 });

    } catch (error) {
        console.error('Update custom request error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const requestId = searchParams.get('requestId');
        const adminPassword = searchParams.get('password');

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!requestId) {
            return NextResponse.json(
                { error: 'Request ID is required' },
                { status: 400 }
            );
        }

        // Delete custom request
        const { error } = await supabase
            .from('custom_requests')
            .delete()
            .eq('id', requestId);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to delete custom request' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Delete custom request error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
