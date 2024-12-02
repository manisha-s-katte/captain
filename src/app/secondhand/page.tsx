"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

const SecondHandMarket = () => {
	const [userProducts, setUserProducts] = useState<any[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const router = useRouter();

	useEffect(() => {
		// to fetch user purchased products from local storage
		const purchasedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
		setUserProducts(purchasedProducts);
	}, []);

	// FILTERING PRODUCTS BASED ON SEARCH 
	const filteredProducts = userProducts.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// resell action functon
	const resellProduct = (product: any) => {
		// Mark the product as resold
		const updatedProduct = { ...product, isResold: true };
		const updatedProducts = userProducts.map((p) =>
			p.id === product.id ? updatedProduct : p
		);
		setUserProducts(updatedProducts);

		// 
		localStorage.setItem("cart", JSON.stringify(updatedProducts));
		alert("Product resold!");
	};

	return (
		<>
			<Navbar />
			<div className="flex">
				{/* Sidebar */}
				<div className="w-1/4 p-4 border-r">
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
						{filteredProducts.length === 0 ? (
							<p className="col-span-full text-center">
								No products available for resale.
							</p>
						) : (
							filteredProducts.map((product: any) => (
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
										onClick={() => resellProduct(product)}
										className="mt-3 bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-400"
										disabled={product.isResold}
									>
										{product.isResold ? "Resold" : "Resell"}
									</button>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SecondHandMarket;
