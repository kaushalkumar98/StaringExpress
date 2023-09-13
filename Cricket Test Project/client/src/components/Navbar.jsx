import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cricketers
          </Typography>
          <Button
            color="inherit"
            sx={{ mx: { xs: 0, md: 3, lg: 5 } }}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/search")}>
            Search
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
