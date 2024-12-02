"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

const Marketplace = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [userProducts, setUserProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [credits, setCredits] = useState(1000); // Initialize user credits
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();

    const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    setUserProducts(cartProducts);
  }, []);

  const handleBuy = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && credits >= product.price) {
      setCredits((prevCredits) => prevCredits - product.price);
      alert(`You bought ${product.name}!`);
      addToCart(product);
    } else {
      alert("Not enough credits!");
    }
  };

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.some((item: any) => item.id === product.id)) {
      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setUserProducts(updatedCart);
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
          <button className="w-full mb-4 p-2 bg-blue-500 text-white rounded" onClick={() => router.push("/cart")}>
            Cart
          </button>
          <button className="w-full mb-4 p-2 bg-blue-500 text-white rounded" onClick={() => router.push("/marketplace")}>
            Market Place
          </button>
          <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={() => router.push("/secondhand")}>
            Second-Hand Market
          </button>
        </div>

        {/* Main Content */}
        <div className="w-3/4 p-5">
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full p-2 mb-5 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product: any) => (
                <div key={product.id} className="border p-5 text-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    loading="lazy"
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
          )}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
