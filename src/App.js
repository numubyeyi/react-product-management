// src/App.js
import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProductManagement from "./components/ProductManagement";

function App() {
  const [page, setPage] = useState("login");
  const [users, setUsers] = useState([{ email: "user@test.com", password: "1234" }]); // default user
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (email, password) => {
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      setCurrentUser(found);
      setPage("products");
    } else {
      alert("Invalid credentials. Try again.");
    }
  };

  const handleSignup = (email, password) => {
    setUsers([...users, { email, password }]);
    alert("Account created successfully! Please login.");
    setPage("login");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={handleLogin}
          goToSignup={() => setPage("signup")}
        />
      )}
      {page === "signup" && (
        <Signup
          onSignup={handleSignup}
          goToLogin={() => setPage("login")}
        />
      )}
      {page === "products" && (
        <ProductManagement
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;
