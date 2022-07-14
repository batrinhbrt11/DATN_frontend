import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customer from "./Customer";
import Admin from "./Admin";

import { useSelector } from "react-redux";

import { selectUser } from "./redux/cusAuthSlice";

function App() {
  const user = useSelector(selectUser);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Customer />}></Route>

          <Route
            path="/admin/*"
            element={user.role !== "customer" ? <Admin /> : <Customer />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export const URL = process.env.REACT_APP_API_URL;
