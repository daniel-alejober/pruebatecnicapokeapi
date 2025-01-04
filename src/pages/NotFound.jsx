import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1" color="white" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h3" color="white">
          Pagina no encontrada
        </Typography>
        <Button
          style={{ marginTop: 15 }}
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Volver
        </Button>
      </Box>
    </Grid>
  );
};

export default NotFound;
