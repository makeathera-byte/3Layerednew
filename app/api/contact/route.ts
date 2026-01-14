import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert contact submission into database
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert({
                name,
                email,
                subject,
                message,
                status: 'unread'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to submit contact form' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            submission: data
        }, { status: 201 });

    } catch (error) {
        console.error('Contact form error:', error);
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

        // Fetch all contact submissions
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch contact submissions' },
                { status: 500 }
            );
        }

        return NextResponse.json({ submissions: data }, { status: 200 });

    } catch (error) {
        console.error('Fetch contact submissions error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { submissionId, status, adminNotes, adminPassword } = body;

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update contact submission
        const updateData: any = {};
        if (status) {
            updateData.status = status;
            if (status === 'read' && !updateData.read_at) {
                updateData.read_at = new Date().toISOString();
            }
        }
        if (adminNotes !== undefined) updateData.admin_notes = adminNotes;

        const { data, error } = await supabase
            .from('contact_submissions')
            .update(updateData)
            .eq('id', submissionId)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to update contact submission' },
                { status: 500 }
            );
        }

        return NextResponse.json({ submission: data }, { status: 200 });

    } catch (error) {
        console.error('Update contact submission error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
