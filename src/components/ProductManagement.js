// src/components/ProductManagement.js
import React, { useState } from "react";

export default function ProductManagement({ currentUser, onLogout }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editIndex !== null) {
      // Update product
      const updated = [...products];
      updated[editIndex] = { name, price };
      setProducts(updated);
      setEditIndex(null);
    } else {
      // Add product
      setProducts([...products, { name, price }]);
    }
    setName("");
    setPrice("");
  };

  const handleEdit = (index) => {
    setName(products[index].name);
    setPrice(products[index].price);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">
          Welcome, {currentUser?.email}
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleAddOrUpdate} className="bg-white p-4 shadow rounded-lg mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="flex-1 p-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-32 p-2 border rounded-lg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No products available
              </td>
            </tr>
          ) : (
            products.map((product, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(i)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
