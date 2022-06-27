import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import Admin from "./Admin";
import Book from "./Customer/Book";
import Login from "./Customer/Login";
import Info from "./Customer/Info";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customer />}></Route>
          <Route path="/book" element={<Book />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const URL = process.env.REACT_APP_API_URL;
