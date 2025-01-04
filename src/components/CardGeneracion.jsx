import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const CardGeneracion = ({ generacion }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={generacion && generacion.img}
        title={generacion && generacion.nombre}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textAlign="center"
        >
          {generacion && generacion.nombre}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#031324", color: "whitesmoke" }}
          onClick={() => navigate(`/generacion/${generacion.id}`)}
        >
          Consultar Generación
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardGeneracion;
