import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
  ];

  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Add product to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Remove product
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    if (qty <= 0) return;
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(10);
    } else if (coupon === "DISCOUNT20") {
      setDiscount(20);
    } else {
      setDiscount(0);
      alert("Invalid coupon!");
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = (subtotal * discount) / 100;
  const gst = subtotal * 0.18; // 18% GST
  const grandTotal = subtotal - discountAmount + gst;

  return (
    <div className="app">
      <h1>🛒 Online Shopping Cart</h1>

      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product">
            <p>{p.name} - ₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>
                {item.name} - ₹{item.price} × {item.qty}
              </p>
              <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
              <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <h2>Coupon</h2>
      <input
        type="text"
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <button onClick={applyCoupon}>Apply</button>

      <h2>Summary</h2>
      <p>Subtotal: ₹{subtotal}</p>
      <p>Discount: ₹{discountAmount}</p>
      <p>GST (18%): ₹{gst.toFixed(2)}</p>
      <h3>Grand Total: ₹{grandTotal.toFixed(2)}</h3>
    </div>
  );
}

export default App;
