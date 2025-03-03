import React from "react";
import { Container, Typography } from "@mui/material";
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <Container>
        <Typography variant="h4" align="center" gutterBottom className="app-title" marginTop="1px">
        </Typography>
        <ProductList />
        <Cart />
      </Container>
    </CartProvider>
  );
};

export default App;
