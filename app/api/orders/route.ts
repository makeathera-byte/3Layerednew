import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { customerName, customerEmail, customerPhone, customerAddress, items, subtotal, total } = body;

        // Validate required fields
        if (!customerName || !customerEmail || !items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Insert order into database
        const { data, error } = await supabase
            .from('orders')
            .insert({
                order_number: orderNumber,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                customer_address: customerAddress,
                items: items,
                subtotal: subtotal,
                tax: 0,
                shipping: 0,
                total: total,
                status: 'pending',
                payment_status: 'pending'
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to create order' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            order: data,
            orderNumber: orderNumber
        }, { status: 201 });

    } catch (error) {
        console.error('Order creation error:', error);
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

        // Fetch all orders
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch orders' },
                { status: 500 }
            );
        }

        return NextResponse.json({ orders: data }, { status: 200 });

    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { orderId, status, adminPassword } = body;

        // Verify admin password
        if (adminPassword !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update order status
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to update order' },
                { status: 500 }
            );
        }

        return NextResponse.json({ order: data }, { status: 200 });

    } catch (error) {
        console.error('Update order error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// DELETE handler - Delete an order (admin only)
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get('orderId');
        const password = searchParams.get('password');

        // Verify admin password
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('orders')
            .delete()
            .eq('id', orderId);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to delete order' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Order deleted successfully' });

    } catch (error) {
        console.error('Delete order error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
