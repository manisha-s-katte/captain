import { NextResponse } from 'next/server';

// Mock Database (for demonstration purposes, replace with actual DB logic)
// let products = [
//   { id: 1, name: 'Product 1', price: 100, image: '/images/product1.jpg' },
//   { id: 2, name: 'Product 2', price: 150, image: '/images/product2.jpg' },
// ];
let products = [
    { id: 1, name: 'Product 1', price: 100, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 150, image: '/images/product2.jpg' },
   
  ];
  
// GET Request: Fetch All Products
export async function GET() {
  return NextResponse.json(products);
}

// POST Request: Add a New Product (for Admin only)
export async function POST(req: Request) {
  const { name, price, image } = await req.json();
  
  // Validate incoming data
  if (!name || !price || !image) {
    return NextResponse.json(
      { error: 'Missing required fields (name, price, image)' },
      { status: 400 }
    );
  }

  // Create a new product and add it to the list
  const newProduct = { id: products.length + 1, name, price, image };
  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}
