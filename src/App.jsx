import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./components/Header";
import Home from "./pages/Home";
import Generaciones from "./pages/Generaciones";
import Generacion from "./pages/Generacion";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";

function App() {
  const theme = useTheme();
  const bpxs = useMediaQuery(theme.breakpoints.down("xs"));
  const bpsm = useMediaQuery(theme.breakpoints.down("sm"));
  const bpmd = useMediaQuery(theme.breakpoints.down("md"));
  const headerHeight = bpxs || bpmd || bpsm ? 40 : 10;
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#031324",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
          paddingTop: `${headerHeight}%`,
        }}
      >
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generaciones" element={<Generaciones />} />
          <Route path="/generacion/:id" element={<Generacion />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
