
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";

const Cart = () => {
	const [cartItems, setCartItems] = useState<any[]>([]);
	const router = useRouter();

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem("cart") || "[]");
		setCartItems(cart);
	}, []);

	// emove items from the cart
	const removeFromCart = (productId: number) => {
		const updatedCart = cartItems.filter((item: any) => item.id !== productId);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
		setCartItems(updatedCart);
		alert("Product removed from cart!");
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
					<h1 className="text-2xl font-semibold mb-5">Your Cart</h1>

					{/* Cart Items */}
					{cartItems.length === 0 ? (
						<p className="text-center text-gray-500">Your cart is empty.</p>
					) : (
						<>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
								{cartItems.map((item: any) => (
									<div
										key={item.id}
										className="border p-5 text-center"
									>
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-48 object-cover mb-3"
										/>
										<h3 className="text-lg font-semibold">{item.name}</h3>
										<p className="text-sm text-gray-600">${item.price}</p>
										<button
											onClick={() => removeFromCart(item.id)}
											className="mt-3 bg-red-500 text-white py-2 px-4 rounded"
										>
											Remove
										</button>
									</div>
								))}
							</div>

							{/* Cart Total */}
							<div className="mt-5 border-t pt-5">
								<h3 className="text-xl font-semibold">
									Total: $
									{cartItems.reduce((total, item) => total + item.price, 0)}
								</h3>
								<button
									className="mt-3 bg-green-500 text-white py-2 px-4 rounded"
									onClick={() => alert("Proceeding to checkout...")}
								>
									Proceed to Checkout
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
