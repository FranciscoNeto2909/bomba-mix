import { glasses } from "../../data/data";
import { SiBuymeacoffee } from "react-icons/si";
import "./sell.css";
import { useState } from "react";

export default function Sell() {
  const [glassId, setGlassId] = useState();
  const [glassSize, setGlassSize] = useState();
  const [glassPrice, setGlassPrice] = useState();

  function handleSelectGlass(i, glass) {
    setGlassId(i);
    setGlassSize(glass.size);
    setGlassPrice(glass.price);
  }
  return (
    <div className="sell">
      <h2 className="sell-title">Tamanhos</h2>
      <div className="sell-glasses">
        {glasses.map((glass, i) => (
          <div className="sell-glass">
            <button
              onClick={() => handleSelectGlass(i, glass)}
              className={`sell-glass-button ${
                i == glassId && "sell-glass--selected"
              }`}
            >
              <SiBuymeacoffee size={60} className="sell-glass-icon" />
              <div className="sell-glass-texts">
                <span className="sell-glass-size">{glass.size}</span>
                <p className="sell-glass-price">R$:{glass.price},00</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="sell-flavors"></div>
      <div className="sell-topping"></div>
      <div className="sell-acommpaniment"></div>
      <div className="sell-whey"></div>
      <div className="sell-combos"></div>
      <div className="sell-buttons"></div>
    </div>
  );
}
