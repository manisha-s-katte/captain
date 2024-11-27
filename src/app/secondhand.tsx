import { useEffect, useState } from "react";

const SecondHandMarket = () => {
  const [userProducts, setUserProducts] = useState<any[]>([]);

  // simulating fetching user purchased products
  useEffect(() => {
    const purchasedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
    setUserProducts(purchasedProducts);
  }, []);

  // function to resell a producttttt
  const resellProduct = (product: any) => {
    // Simulate reselling the product after adding it to the marketplace
    const newProduct = { ...product, isResold: true };
    // Here you could also add it to a database or a separate list of second-hand products
    console.log("Reselling product:", newProduct);
  };

  return (
    <div className="secondhand-market">
      <h1>Second-Hand Market</h1>
      <div className="product-list">
        {userProducts.length === 0 ? (
          <p>No products available for resale.</p>
        ) : (
          userProducts.map((product: any) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => resellProduct(product)}>Resell</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SecondHandMarket;
