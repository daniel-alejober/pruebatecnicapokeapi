import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getColorByType } from "../utils/getColorByType";
import { capitalizeLetter } from "../utils/capitalizeLetter";
import { handleError } from "../utils/showAlert";

const CardPokemon = ({ pokemon }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataPokemon, setDataPokemon] = useState({});
  const [imagePokemon, setImagePokemon] = useState({});
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const getPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        if (response.data && response.data.sprites) {
          setDataPokemon(response.data);
          setImagePokemon(response.data.sprites);
          setTypes(response.data.types);
        }
      } catch (error) {
        handleError("Error al tratar de consultar la información del pokemon");
      }
    };
    getPokemon();
  }, []);

  return (
    <Box
      sx={{
        width: 302,
        height: 290,
        margin: 2,
        perspective: "600px",
        display: "inline-block",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s",
          "&:hover": {
            transform: "rotateY(180deg)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            backgroundColor:
              types.length > 0 ? getColorByType(types[0].type.name) : "#f0f0f0",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={
                imagePokemon.other?.dream_world?.front_default
                  ? imagePokemon.other?.dream_world?.front_default
                  : imagePokemon.front_default
              }
              alt={pokemon.name}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            component="div"
            textAlign="center"
            sx={{ marginTop: "8px" }}
          >
            {capitalizeLetter(pokemon.name)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            {types.map((type, index) => (
              <Box
                key={index}
                sx={{
                  padding: "2px 7px",
                  borderRadius: "4px",
                  backgroundColor: getColorByType(type.type.name),
                  color: "whitesmoke",
                }}
              >
                {type.type.name && type.type.name.toUpperCase()}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor:
              types.length > 0 ? getColorByType(types[0].type.name) : "#f0f0f0",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              color: "white",
              padding: "12px 24px",
            }}
            onClick={() =>
              Object.keys(dataPokemon).length > 0
                ? navigate(`/pokemon/${pokemon.name}`, {
                    state: { ...dataPokemon, prevurl: location.pathname },
                  })
                : () => {}
            }
          >
            {Object.keys(dataPokemon).length > 0
              ? "Más Información"
              : "Información no disponible"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardPokemon;
