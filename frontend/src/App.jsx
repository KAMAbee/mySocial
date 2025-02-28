import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>main</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<h1>login</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
