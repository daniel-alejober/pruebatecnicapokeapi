import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { CircularProgress, Box } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
const LazyCard = React.lazy(() => import("../components/CardPokemon"));

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPokemons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );

        if (response.data) {
          setPokemons(response.data.results);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, []);
  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "90%", md: "60%" },
        margin: "0 auto",
        padding: "40px 0",
      }}
    >
      {loading && <CircularProgress color="success" />}
      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
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
      </Grid>
    </Box>
  );
};

export default Home;
