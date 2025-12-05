import { NextResponse } from 'next/server';
import { getUserOrders, createOrder } from '@/lib/db/orders';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const orders = await getUserOrders(session.user.id);
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error getting orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { items, total, stripePaymentIntentId } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Valid total is required' },
        { status: 400 }
      );
    }

    const result = await createOrder({
      userId: session.user.id,
      items,
      total: parseFloat(total),
      status: 'pending',
      stripePaymentIntentId: stripePaymentIntentId || '',
    });

    return NextResponse.json(
      {
        message: 'Order created successfully',
        orderId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

