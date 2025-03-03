import React from "react";
import { Card, Typography, IconButton, Box, Button, TextField } from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import { useCart } from "./CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, setCart } = useCart();

  const handleCheckout = () => {
    alert("Thank you for your purchase! Your order has been confirmed.");
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Card sx={{ padding: "20px", marginTop: "20px", boxShadow: 3, borderRadius: "12px" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography align="center">Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "15px 10px",
                borderBottom: "1px solid #ddd",
                gap: "10px",
              }}
            >
              {/* Image and Name */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "15px", width: "40%" }}>
                <img src={item.image} alt={item.name} width="50" style={{ borderRadius: "5px" }} />
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
              </Box>
              
              {/* Price */}
              <Typography variant="body1" sx={{ width: "15%", textAlign: "center" }}>
                ${item.price}
              </Typography>
              
              {/* Quantity Controls */}
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #808080", borderRadius: "8px", width: "11.5%", justifyContent: "center" }}>
                <IconButton
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  sx={{ color: "#d32f2f", '&:hover': { backgroundColor: "#f0f0f0" } }}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <TextField
                  type="number"
                  value={item.quantity}
                  inputProps={{ min: 1, style: { textAlign: "center", width: "40px", fontWeight: "bold" } }}
                  variant="standard"
                  sx={{ width: "50px", textAlign: "center", border: "none" }}
                  disabled
                />
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  sx={{ color: "#1976d2", '&:hover': { backgroundColor: "#f0f0f0" } }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
              
              {/* Remove Button */}
              <IconButton onClick={() => removeFromCart(item.id)}>
                <Delete color="error" />
              </IconButton>
            </Box>
          ))}
          
          {/* Total and Checkout Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              padding: "10px 0",
            }}
          >
            <Typography variant="h6">
              Total: ${totalPrice.toFixed(2)} ({totalItems} {totalItems === 1 ? "item" : "items"})
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleCheckout}
              sx={{ borderRadius: "8px", backgroundColor: "#2e7d32", '&:hover': { backgroundColor: "#1b5e20" } }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
};

export default Cart;
