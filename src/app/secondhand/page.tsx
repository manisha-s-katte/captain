import { useEffect, useState } from "react";

const SecondHandMarket = () => {
  const [resoldProducts, setResoldProducts] = useState<any[]>([]);

  useEffect(() => {
    // Get resold products from localStorage (from the user’s cart)
    const cartProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    const resoldItems = cartProducts.filter((product: any) => product.isResold);
    setResoldProducts(resoldItems);
  }, []);

  return (
    <div className="secondhand-market">
      <h1>Second-Hand Market</h1>
      {resoldProducts.length === 0 ? (
        <p>No resold products available.</p>
      ) : (
        <div className="resold-product-list">
          {resoldProducts.map((product: any) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button disabled>Resold Item</button> {/* Disabled resell button */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondHandMarket;
