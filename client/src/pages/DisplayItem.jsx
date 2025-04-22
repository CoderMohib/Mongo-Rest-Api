import { useState, useEffect } from "react";
import axios from "axios";

export default function DisplayItems() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updateItem, setUpdateItem] = useState({});

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/items?sitem=");
        setItems(response.data);
      } catch (err) {
        console.log("Error fetching items:", err);
      }
    };

    getItems();
  }, []);

  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/items/${id}`);
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

  const handleOnUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/items/${id}`, updateItem);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, ...updateItem } : item
        )
      );
      setEditingItem(null);
      setUpdateItem({});
    } catch (err) {
      console.log("Error updating item:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Item List</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1.5rem",
              background: "#f9f9f9",
            }}
          >
            {editingItem === item._id ? (
              <form
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "0.5rem 1rem",
                  alignItems: "center",
                }}
              >
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  type="text"
                  defaultValue={item.name}
                  onChange={(e) =>
                    setUpdateItem({ ...updateItem, name: e.target.value })
                  }
                />

                <label htmlFor="description">Description:</label>
                <input
                  id="description"
                  type="text"
                  defaultValue={item.description}
                  onChange={(e) =>
                    setUpdateItem({
                      ...updateItem,
                      description: e.target.value,
                    })
                  }
                />

                <label htmlFor="price">Price:</label>
                <input
                  id="price"
                  type="number"
                  defaultValue={item.price}
                  min={0}
                  step="0.01"
                  onChange={(e) =>
                    setUpdateItem({ ...updateItem, price: e.target.value })
                  }
                />

                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    setUpdateItem({
                      ...updateItem,
                      quantity: e.target.value,
                    })
                  }
                />

                <label htmlFor="category">Category:</label>
                <input
                  id="category"
                  type="text"
                  defaultValue={item.category}
                  onChange={(e) =>
                    setUpdateItem({
                      ...updateItem,
                      category: e.target.value,
                    })
                  }
                />

                <div></div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleOnUpdate(item._id);
                    }}
                  >
                    Save
                  </button>{" "}
                  <button onClick={() => setEditingItem(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <p>
                  <strong>Quantity:</strong>{" "}
                  {item.quantity > 0 ? item.quantity : "Stock Not Available"}
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <button onClick={() => handleOnDelete(item._id)}>Delete</button>{" "}
                <button onClick={() => setEditingItem(item._id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
