import { NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/db/products';
import { isAdmin } from '@/lib/auth';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const filters = {};
    if (category) {
      filters.category = category;
    }

    const products = await getProducts(filters);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error getting products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Check if user is admin
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, price, imageUrl, stock, category } = body;

    // Validation
    if (!name || !price) {
      return NextResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const result = await createProduct({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
      stock: parseInt(stock) || 0,
      category,
    });

    return NextResponse.json(
      {
        message: 'Product created successfully',
        productId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
