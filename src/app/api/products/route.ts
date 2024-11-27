import { NextResponse } from "next/server";

// Mock Database (for demonstration purposes, replace with actual DB logic)
// let products = [
//   { id: 1, name: 'Product 1', price: 100, image: '/images/product1.jpg' },
//   { id: 2, name: 'Product 2', price: 150, image: '/images/product2.jpg' },
// ];
let products = [
	{
		id: 1,
		name: "Product 1",
		price: 100,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2F6a8629c1-38c6-47ef-9901-d1ccc4dc30be-ARSENAL%25201.webp&w=1920&q=90",
	},
	{
		id: 3,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
	{
		id: 4,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
	{
		id: 5,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
	{
		id: 6,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
	{
		id: 2,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
	{
		id: 2,
		name: "Product 2",
		price: 150,
		image:
			"https://captain-side.vercel.app/_next/image?url=https%3A%2F%2Fwteevsttakocypgyobcb.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Fbfc82689-bcea-4fc1-abd2-aa7870d757fc-ARSENAL%25202.webp&w=1920&q=90",
	},
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
			{ error: "Missing required fields (name, price, image)" },
			{ status: 400 }
		);
	}

	// Create a new product and add it to the list
	const newProduct = { id: products.length + 1, name, price, image };
	products.push(newProduct);

	return NextResponse.json(newProduct, { status: 201 });
}
