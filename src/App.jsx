import Nav from "./components/nav/Nav";
import Menu from "./components/menu/Menu";
import logo from "./assets/logo.png";
import { SiBuymeacoffee } from "react-icons/si";
import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sell from "./pages/sell/Sell";
import Summary from "./pages/summary/Summary";
import Inventory from "./pages/inventory/Inventory";
import { useMyStore } from "./store/store";

function App() {
  const items = useMyStore();

  const [sales, setSales] = useState({ bombamix: [], delivery: [] });

  function handleSetSell(order) {
    items.removeToGlass(1);
    setSales(prev => {
      if (order.delivery) {
        return {
          ...prev,
          delivery: [...prev.delivery, order],
        };
      } else {
        return {
          ...prev,
          bombamix: [...prev.bombamix, order],
        };
      }
    });
  }

  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="" />
        </div>
        <div className="logo-name">BOMBAMIX SGA</div>
        {window.innerWidth > 768 && <Nav />}
        <div className="glass">
          <span className="glass-quant">{items.glassQuant}</span>
          <SiBuymeacoffee size={44} />
        </div>
      </div>
      <Routes>
        <Route path="fechamento" element={<Summary sales={sales} />} />
        <Route path="/" element={<Sell handleSetSell={handleSetSell} />} />
        <Route path="estoque" element={<Inventory />} />
      </Routes>
      {window.innerWidth < 768 && <Menu />}
    </>
  );
}

export default App;
