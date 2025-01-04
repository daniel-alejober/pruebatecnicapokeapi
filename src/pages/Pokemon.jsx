import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Typography, Box, LinearProgress } from "@mui/material";
import { getColorByType } from "../utils/getColorByType";
import { capitalizeLetter } from "../utils/capitalizeLetter";

const Pokemon = () => {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: { xs: "95%", sm: "100%" },
        height: { xs: "auto", sm: "100%" },
      }}
    >
      <span
        onClick={() =>
          navigate(data.prevurl.startsWith("/pokemon/") ? "/" : data.prevurl)
        }
        style={{
          cursor: "pointer",
          color: "#007BFF",
          fontWeight: "bold",
          textDecoration: "underline",
          marginLeft: "40px",
        }}
      >
        Volver
      </span>
      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          minHeight: "100vh",
          marginTop: "max(40px, 10vh)",
          padding: 2,
          maxWidth: "95%",
          margin: "0 auto",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            p: 2,
            marginX: "auto",
            gap: 3,
          }}
        >
          <Stack
            sx={{
              flexDirection: "column",
              alignSelf: "center",
              gap: 4,
              minWidth: 450,
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              padding: 3,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              height: "100%",
              minHeight: "100%",
              width: { xs: "90%" },
            }}
          >
            <Typography
              variant="h5"
              component="div"
              textAlign="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Información
            </Typography>

            <Typography
              variant="h6"
              component="div"
              textAlign="center"
              sx={{
                color: "text.primary",
                backgroundColor: "primary.light",
                padding: 1,
                borderRadius: "5px",
              }}
            >
              Altura: {data.height}
            </Typography>

            <Typography
              variant="h6"
              component="div"
              textAlign="center"
              sx={{
                color: "text.primary",
                backgroundColor: "secondary.light",
                padding: 1,
                borderRadius: "5px",
              }}
            >
              Peso: {data.weight} kg
            </Typography>

            <div>
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Stats
              </Typography>

              {data.stats.map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  sx={{ gap: 2 }}
                >
                  <Typography
                    sx={{
                      fontWeight: "medium",
                      minWidth: 100,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.stat.name}:
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.base_stat}
                    sx={{
                      flex: 1,
                      height: 10,
                      borderRadius: "5px",
                      backgroundColor: "grey.200",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      minWidth: 40,
                      textAlign: "center",
                    }}
                  >
                    {item.base_stat}
                  </Typography>
                </Stack>
              ))}
            </div>

            <div>
              <Typography
                variant="h5"
                component="div"
                textAlign="center"
                sx={{
                  marginBottom: 2,
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Habilidades
              </Typography>
              {data.abilities.map((item, index) => (
                <Typography
                  key={index}
                  gutterBottom
                  sx={{
                    fontWeight: "medium",
                    textAlign: "center",
                    textTransform: "capitalize",
                    padding: 1,
                    backgroundColor: "secondary.light",
                    borderRadius: "5px",
                    marginBottom: 1,
                  }}
                >
                  {item.ability.name}
                </Typography>
              ))}
            </div>
          </Stack>

          <Stack
            sx={{
              flexDirection: "column",
              alignSelf: "center",
              gap: 4,
              minWidth: 450,
              background:
                data.types.length > 0
                  ? `linear-gradient(135deg, ${getColorByType(
                      data.types[0].type.name
                    )} 0%, #444 100%)`
                  : "#555",
              borderRadius: "20px",
              padding: 4,
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              textAlign="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "2px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {capitalizeLetter(data.name)} #{data.order}
            </Typography>

            <Box
              sx={{
                width: "100%",
                height: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "15px",
              }}
            >
              <img
                src={
                  data.sprites.other?.dream_world?.front_default
                    ? data.sprites.other?.dream_world?.front_default
                    : data.sprites.front_default
                }
                alt={data.name}
                style={{
                  objectFit: "contain",
                  maxWidth: "80%",
                  maxHeight: "80%",
                  filter: "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.3))",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.filter =
                    "drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.4))";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter =
                    "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.3))";
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Pokemon;
