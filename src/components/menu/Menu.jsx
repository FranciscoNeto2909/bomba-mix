import { FaMoneyBill, FaArchive } from "react-icons/fa";
import { SiBuymeacoffee } from "react-icons/si";
import "./menu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [route, setRoute] = useState("vender");
  return (
    <div className="menu">
      <ul className="menu-list">
        <li className={`menu-item ${route == "fechamento" && "menu-item--selected"}`}>
          <button className="menu-button" onClick={() => setRoute("fechamento")}>
            <Link to={"/fechamento"}>
              <FaMoneyBill className="menu-list-icon" size={35} />
            </Link>
          </button>
        </li>
        <li className={`menu-item ${route == "vender" && "menu-item--selected"}`}>
          <button className="menu-button" onClick={() => setRoute("vender")}>
            <Link to={"/vender"}>
              <SiBuymeacoffee className="menu-list-icon" size={35} />
            </Link>
          </button>
        </li>
        <li className={`menu-item ${route == "estoque" && "menu-item--selected"}`}>
          <button className="menu-button" onClick={() => setRoute("estoque")}>
            <Link to={"Estoque"}>
              <FaArchive className="menu-list-icon" size={30} />
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
}
