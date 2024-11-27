'use client'; // <-- Add this line at the top

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // <-- Use next/navigation instead of next/router

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState<any[]>([]); // To store the user's products for resale
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();

    // Retrieve purchased products from localStorage (assuming they have already been added to the cart)
    const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    setUserProducts(cartProducts);
  }, []);

  // Function to add products to the cart
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productInCart = cart.find((item: any) => item.id === product.id);
    if (!productInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      alert("This product is already in your cart.");
    }
  };

  // Function to resell a product
  const resellProduct = (product: any) => {
    // Check if the product is already resold
    const productResold = { ...product, isResold: true };

    // Add the product to the resellProducts list
    const updatedUserProducts = [...userProducts, productResold];
    setUserProducts(updatedUserProducts);

    // Store updated list in localStorage for persistence
    localStorage.setItem("cart", JSON.stringify(updatedUserProducts));

    alert("Product has been resold!");
  };

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>
      <div className="product-list">
        {products.map((product: any) => (
          <div key={product.id} className="product-item">
            {/* Assuming your images are stored in the public/images/ folder */}
            
            <img src={`/images/${product.image}`} alt={product.name} /> {/* Update the image path */}
            <h3>{product.name}</h3>
            <p>${product.price}</p>

            {/* Display resell button for purchased products */}
            {userProducts.some((userProduct: any) => userProduct.id === product.id) ? (
              <button
                onClick={() => resellProduct(product)}
                disabled={product.isResold}
              >
                {product.isResold ? "Already Resold" : "Resell"}
              </button>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => router.push('/cart')}>Go to Cart</button> {/* Button to view cart */}
      <button onClick={() => router.push('/secondhand')}>Go to Second-Hand Market</button> {/* Link to second-hand market */}
    </div>
  );
};

export default Marketplace;
