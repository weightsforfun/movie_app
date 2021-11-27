import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Detail from "./router/Detail";
import Home from "./router/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<Detail />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
