import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { handleError } from "../utils/showAlert";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [pokemon, setPokemon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pokemon === "") return;

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      if (response.data && response.data.sprites) {
        setPokemon("");
        const dataPokemon = response.data;
        navigate(`/pokemon/${dataPokemon.name}`, {
          state: { ...dataPokemon, prevurl: location.pathname },
        });
      }
    } catch (error) {
      handleError("No existe pokemon con ese nombre o ese número");
      setPokemon("");
    }
  };

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: "blur(24px)",
    border: "1px solid #41454b",
    padding: "8px 12px",
  }));

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 0,
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <img
                src="/pokemon.svg"
                alt="logo pokemon"
                style={{ width: "250px", height: "50px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <Button
                variant="text"
                color="primary"
                size="small"
                sx={{ color: "whitesmoke" }}
                onClick={() => navigate("/generaciones")}
              >
                Generaciones
              </Button>
            </Box>
          </Box>

          <Box
            sx={{ display: { xs: "flex", md: "none" }, gap: 1, width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <img
                src="/pokemon.svg"
                alt="logo pokemon"
                style={{ width: "250px", height: "50px", marginRight: "auto" }}
                onClick={() => navigate("/")}
              />
            </Box>
            <IconButton
              sx={{ color: "white" }}
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                  backgroundColor: "#031324",
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{ color: "white" }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem
                  sx={{ color: "whitesmoke" }}
                  onClick={() => {
                    toggleDrawer(false);
                    navigate("/generaciones");
                  }}
                >
                  Generaciones
                </MenuItem>

                <Divider sx={{ my: 3 }} />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          width: { sm: "90%", xs: "90%", md: "50%" },
          margin: "0 auto",
          marginTop: { sm: "20px", xs: "10px", md: "10px" },
        }}
      >
        <form style={{ display: "flex", flexGrow: 1 }} onSubmit={handleSubmit}>
          <TextField
            id="outlined-controlled"
            variant="outlined"
            className="custom-textfield"
            label="Buscar por pokemon"
            fullWidth
            value={pokemon}
            onChange={(event) => {
              setPokemon(event.target.value);
            }}
          />

          <button type="submit" style={{ display: "none" }}>
            Submit
          </button>
        </form>
      </Box>
    </AppBar>
  );
};

export default Header;
