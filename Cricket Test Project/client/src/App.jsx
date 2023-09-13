import "./App.css";
import Home from "./routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./routes/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Home key="edit" />} path="/edit/:id" exact />
        <Route element={<Search />} path="/search" exact />
      </Routes>
    </Router>
  );
}

export default App;
