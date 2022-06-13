import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import Admin from "./Admin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customer />}>
            <Route index element={<Customer />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
