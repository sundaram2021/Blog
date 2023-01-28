import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home ";
import Blogs from "./components/Blogs";
import Write from "./components/Write";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/write' element={<Write />} />
      </Routes>
    </>
  );
}

export default App;
