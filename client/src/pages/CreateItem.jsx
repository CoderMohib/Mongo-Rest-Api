import React, { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "1rem" }}>
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          minLength={2}
          maxLength={20}
          required
        /><br /><br />

        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min={0}
          step="0.01"
        /><br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min={0}
          required
        /><br /><br />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          minLength={3}
          maxLength={15}
          required
        /><br /><br />

        <button type="submit">Create Item</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
