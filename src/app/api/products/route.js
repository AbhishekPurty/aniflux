// Products API route
// Will be implemented in Phase 4: API Routes
// Package needed: mongodb

import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement get all products
  return NextResponse.json({ message: 'Products API - To be implemented' });
}

export async function POST() {
  // TODO: Implement create product (admin only)
  return NextResponse.json({ message: 'Create product API - To be implemented' });
}

