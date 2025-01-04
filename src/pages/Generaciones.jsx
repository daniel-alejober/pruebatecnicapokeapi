import React from "react";
import { Grid2 as Grid } from "@mui/material";
import { generaciones } from "../constantes/generaciones";
import CardGeneracion from "../components/CardGeneracion";
import { Box } from "@mui/material";

const Generaciones = () => {
  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "90%", md: "60%" },
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        {generaciones.map((generacion) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={generacion.id}
            sx={{ display: "flex" }}
          >
            <CardGeneracion generacion={generacion} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Generaciones;
