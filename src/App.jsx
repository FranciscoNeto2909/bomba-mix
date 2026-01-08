import Nav from "./components/nav/Nav";
import Menu from "./components/menu/Menu";
import logo from "./assets/logo.png";
import { SiBuymeacoffee } from "react-icons/si";
import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const [glassQuant, setGlassQuant] = useState(30);
  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="" />
        </div>
        <div className="name">BOMBAMIX SGA</div>
        {window.innerWidth > 768 && <Nav />}
        <div className="glass">
          <span className="glass-quant">{glassQuant}</span>
          <SiBuymeacoffee size={44} />
        </div>
      </div>
      <Routes>
        <Route path="fechamento" element={<></>}/>
        <Route path="vender" element={<></>}/>
        <Route path="estoque" element={<></>}/>
      </Routes>
      {window.innerWidth < 768 && <Menu />}
    </>
  );
}

export default App;
