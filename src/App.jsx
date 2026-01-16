import Nav from "./components/nav/Nav";
import Menu from "./components/menu/Menu";
import logo from "./assets/logo.png";
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

  function handleSetSell(order, quant) {
    items.removeGlass(order.copo.id, quant);
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
        <div></div>
      </div>
      {items.message.hasMsg && (
        <div className="message">{items.message.msg}</div>
      )}
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
