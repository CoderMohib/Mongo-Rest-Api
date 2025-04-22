import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePage.css"; 

export default function CreateItem() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3000/items", formData);
      alert("Item created successfully!");
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create item");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Create New Item</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            minLength={2}
            maxLength={20}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            min={0}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            minLength={3}
            maxLength={15}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Create Item
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
