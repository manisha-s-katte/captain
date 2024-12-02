import { NextResponse } from 'next/server';

// dummy database for second-hand products
let secondHandProducts = [
  { id: 1, name: 'Used Product 1', price: 50, image: '/images/secondhand1.jpg' },
  { id: 2, name: 'Used Product 2', price: 80, image: '/images/secondhand2.jpg' },
];

// GET request: fetching second-hand products
export async function GET() {
  return NextResponse.json(secondHandProducts);
}

// POST request: List a Second-Hand Product (User adds a used product for resale)
export async function POST(req: Request) {
  const { name, price, image } = await req.json();

  // validate incoming data
  if (!name || !price || !image) {
    return NextResponse.json(
      { error: 'Missing required fields (name, price, image)' },
      { status: 400 }
    );
  }

  // create a new second-hand product and add it to the list
  const newSecondHandProduct = { id: secondHandProducts.length + 1, name, price, image };
  secondHandProducts.push(newSecondHandProduct);

  return NextResponse.json(newSecondHandProduct, { status: 201 });
}
