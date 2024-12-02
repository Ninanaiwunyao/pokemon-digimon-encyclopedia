import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<Detail />} />
        <Route path="/digimon/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
