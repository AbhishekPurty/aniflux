import { NextResponse } from 'next/server';
import { getOrderById } from '@/lib/db/orders';
import { getSession } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if user owns this order or is admin
    if (order.userId.toString() !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error('Error getting order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

