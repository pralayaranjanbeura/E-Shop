import React from "react";
import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useCart } from "./CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          E-Shop
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCart fontSize="large" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
