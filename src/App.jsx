import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pokemon" element={<Home />} />
        <Route path="/digimon" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<DetailPage type="pokemon" />} />
        <Route path="/digimon/:id" element={<DetailPage type="digimon" />} />
      </Routes>
    </Router>
  );
}

export default App;
