import Nav from "./components/nav/Nav";
import Menu from "./components/menu/Menu";
import logo from "./assets/logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sell from "./pages/sell/Sell";
import Summary from "./pages/summary/Summary";
import Inventory from "./pages/inventory/Inventory";
import { useMyStore } from "./store/store";
import Wellcome from "./pages/wellcome/Wellcome";

function App() {
  const items = useMyStore();
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
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

  function handleLogout() {
    localStorage.removeItem("isLogged");
    setIsLogged(false);
  }

  useEffect(() => {
    setIsLogged(localStorage.getItem("isLogged"));
  }, [localStorage.getItem("isLogged")]);

  return (
    <>
      <div className="header">
        <div className="logo">
          <img className="logo-img" src={logo} alt="" />
        </div>
        <div className="logo-name">BOMBAMIX SGA</div>
        {window.innerWidth > 768 && <Nav />}
        <div>
          {isLogged && (
            <button className="logo-button" onClick={handleLogout}>
              Sair
            </button>
          )}
        </div>
      </div>
      {items.message.hasMsg && (
        <div className="message">{items.message.msg}</div>
      )}
      <Routes>
        <Route
          path="fechamento"
          element={isLogged ? <Summary sales={sales} /> : <Wellcome />}
        />
        <Route
          path="/"
          element={
            isLogged ? <Sell handleSetSell={handleSetSell} /> : <Wellcome />
          }
        />
        <Route
          path="estoque"
          element={isLogged ? <Inventory /> : <Wellcome />}
        />
      </Routes>
      {window.innerWidth < 768 && isLogged && <Menu />}
    </>
  );
}

export default App;
