import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/Auth";
import Dataread from "./components/DataRead";
import Test from "./components/test/Test";
import Node1 from "./components/node/node1";
import Node2 from "./components/node/node2";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route path="node1" element={<Node1 />} />
              <Route path="node2" element={<Node2 />} />
            </Route>
            <Route path="/data" element={<Dataread />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
