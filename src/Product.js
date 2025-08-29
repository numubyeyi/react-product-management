import { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

function Product() {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  const productCollection = collection(db, "product");

  // Fetch products
  const fetchProduct = async () => {
    const data = await getDocs(productCollection);
    setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // Add product
  const addProduct = async () => {
    if (!name || !price) return alert("Fill all fields");
    await addDoc(productCollection, { name, price });
    setName("");
    setPrice("");
    fetchProduct();
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    await deleteDoc(doc(db, "product", id));
    fetchProduct();
  };

  // Start edit
  const startEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
  };

  // Update product
  const updateProduct = async () => {
    if (!name || !price) return alert("Fill all fields");
    const productDoc = doc(db, "product", editingId);
    await updateDoc(productDoc, { name, price });
    setEditingId(null);
    setName("");
    setPrice("");
    fetchProduct();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Product Name"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            className="w-32 border border-gray-300 rounded-lg p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {editingId ? (
            <button
              onClick={updateProduct}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">#</th>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={product.id} className="border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
