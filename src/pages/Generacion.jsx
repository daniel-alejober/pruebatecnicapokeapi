import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Box, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { handleError } from "../utils/showAlert";
const LazyCard = React.lazy(() => import("../components/CardPokemon"));

const Generacion = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState("");
  const [pokemonChunks, setPokemonChunks] = useState([]);
  const [visibleChunks, setVisibleChunks] = useState(1);

  useEffect(() => {
    const getPokemonsGeneration = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/generation/${id}`
        );

        const nameGeneration = response.data.main_region.name;
        const pokemonList = response.data.pokemon_species;
        const chunkSize = 20;
        const chunks = [];
        for (let i = 0; i < pokemonList.length; i += chunkSize) {
          chunks.push(pokemonList.slice(i, i + chunkSize));
        }

        setGeneration(nameGeneration);
        setPokemonChunks(chunks);
      } catch (error) {
        handleError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    getPokemonsGeneration();
  }, [id]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading && visibleChunks < pokemonChunks.length) {
      setVisibleChunks((prevVisibleChunks) => prevVisibleChunks + 1);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "90%", md: "60%" },
        marginTop: { xs: "50px", sm: "50px" },
        margin: "0 auto",
        height: "80vh",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      onScroll={handleScroll}
    >
      {loading && <CircularProgress color="success" />}
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        textAlign="center"
        sx={{ color: "whitesmoke" }}
      >
        {generation && generation.toLocaleUpperCase()}
      </Typography>
      <Grid container spacing={2}>
        {pokemonChunks.slice(0, visibleChunks).map((chunk, chunkIndex) => (
          <React.Fragment key={chunkIndex}>
            {chunk.map((pokemon, index) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 4 }}
                key={pokemon.name + index}
                sx={{ display: "flex" }}
              >
                <Suspense fallback={<CircularProgress color="success" />}>
                  <LazyCard pokemon={pokemon} />
                </Suspense>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default Generacion;
