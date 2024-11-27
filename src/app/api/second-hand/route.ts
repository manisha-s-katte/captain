import { NextResponse } from 'next/server';

// Mock Database for second-hand products
let secondHandProducts = [
  { id: 1, name: 'Used Product 1', price: 50, image: '/images/secondhand1.jpg' },
  { id: 2, name: 'Used Product 2', price: 80, image: '/images/secondhand2.jpg' },
];

// GET Request: Fetch All Second-Hand Products
export async function GET() {
  return NextResponse.json(secondHandProducts);
}

// POST Request: List a Second-Hand Product (User adds a used product for resale)
export async function POST(req: Request) {
  const { name, price, image } = await req.json();

  // Validate incoming data
  if (!name || !price || !image) {
    return NextResponse.json(
      { error: 'Missing required fields (name, price, image)' },
      { status: 400 }
    );
  }

  // Create a new second-hand product and add it to the list
  const newSecondHandProduct = { id: secondHandProducts.length + 1, name, price, image };
  secondHandProducts.push(newSecondHandProduct);

  return NextResponse.json(newSecondHandProduct, { status: 201 });
}
