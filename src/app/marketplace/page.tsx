"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

const Marketplace = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [userProducts, setUserProducts] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [credits, setCredits] = useState(1000); // Initialize user credits
	const router = useRouter();
  

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch("/api/products"); // Adjust API endpoint as needed
			const data = await response.json();
			setProducts(data);
		};

		fetchProducts();

		const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
		setUserProducts(cartProducts);

    
	}, []);

	const handleBuy = (productId: number) => {
		const product = products.find((p) => p.id === productId);
		if (credits >= product.price) {
			setCredits((prevCredits) => prevCredits - product.price); // Deduct credits
			alert(
				`You bought ${product.name}! Remaining credits: ${
					credits - product.price
				}`
			);

			// Add product to cart
			addToCart(product);
		} else {
			alert("Not enough credits!");
		}
	};

	const addToCart = (product: any) => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		if (!cart.some((item: any) => item.id === product.id)) {
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart));
			setUserProducts([...userProducts, product]); // Real-time update
		}
	};

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Navbar />
			<div className="flex">
				{/* Sidebar */}
				<div className="w-1/4 p-4 border-r">
					<h2 className="text-lg font-bold mb-4">Credits: ${credits}</h2>
					<button
						className="w-full mb-4 p-2 bg-blue-500 text-white rounded"
						onClick={() => router.push("/cart")}
					>
						Cart
					</button>
					<button
						className="w-full mb-4 p-2 bg-blue-500 text-white rounded"
						onClick={() => router.push("/marketplace")}
					>
						Market place
					</button>
					<button
						className="w-full p-2 bg-blue-500 text-white rounded"
						onClick={() => router.push("/secondhand")}
					>
						Second-Hand Market
					</button>
				</div>

				{/* Main Content */}
				<div className="w-3/4 p-5">
					{/* Search Bar */}
					<input
						type="text"
						placeholder="Search products..."
						className="w-full p-2 mb-5 border rounded"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					{/* Product Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{filteredProducts.map((product: any) => (
							<div
								key={product.id}
								className="border p-5 text-center"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-48 object-cover mb-3"
								/>
								<h3 className="text-lg font-semibold">{product.name}</h3>
								<p className="text-sm text-gray-600">${product.price}</p>
								<button
									onClick={() => handleBuy(product.id)}
									className="mt-3 bg-green-500 text-white py-2 px-4 rounded"
								>
									Buy
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Marketplace;
