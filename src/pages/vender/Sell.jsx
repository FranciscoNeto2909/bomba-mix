import {
  accompaniment,
  flavores,
  glasses,
  topping,
  wheyFlavor,
} from "../../data/data";
import { SiBuymeacoffee } from "react-icons/si";
import "./sell.css";
import { useState } from "react";

export default function Sell() {
  const [glassId, setGlassId] = useState();
  const [glassSize, setGlassSize] = useState();
  const [glassPrice, setGlassPrice] = useState();
  const [flavorId, setFlavorId] = useState();
  const [flavor, setFlavor] = useState();
  const [topId, setTopId] = useState();
  const [top, setTop] = useState();
  const [acompId, setAcompId] = useState();
  const [acomp, setAcomp] = useState();
  const [wheyId, setWheyId] = useState();
  const [whey, setWhey] = useState();

  function handleSelectGlass(i, glass) {
    setGlassId(i);
    setGlassSize(glass.size);
    setGlassPrice(glass.price);
  }

  function handleSelectFlavor(i, flavor) {
    setFlavorId(i);
    setFlavor(flavor);
  }

  function handleSelectTopping(i, top) {
    setTopId(i);
    setTop(top.name);
  }

  function handleSelectAcompaniment(i, acomp) {
    setAcompId(i);
    setAcomp(acomp.name);
  }

  function handleSelectWhey(i, item) {
    setWheyId(i);
    setWhey(item.name);
  }

  return (
    <div className="sell">
      <h2 className="sell-title">Tamanhos</h2>
      <div className="sell-glasses">
        {glasses.map((glass, i) => (
          <div className="glass">
            <button
              onClick={() => handleSelectGlass(i, glass)}
              className={`glass-button ${i == glassId && "glass--selected"}`}
            >
              <SiBuymeacoffee size={60} className="glass-icon" />
              <div className="glass-texts">
                <span className="glass-size">{glass.size}</span>
                <p className="sell-glass-price">R$:{glass.price},00</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Sabores</h2>
      <div className="sell-flavors">
        {flavores.map((flavor, i) => (
          <div className="sell-flavor">
            <button
              onClick={() => handleSelectFlavor(i, flavor.name)}
              className="flavor-button"
            >
              <img
                className={`flavor-img ${flavorId == i && "flavor--selected"}`}
                src={flavor.img}
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Coberturas</h2>
      <div className="sell-topping">
        {topping.map((top, i) => (
          <div className="topping">
            <button
              onClick={() => handleSelectTopping(i, topping)}
              className="topping-button"
            >
              <img
                src={top.img}
                className={`topping-img ${topId == i && "topping--selected"}`}
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Acompanha</h2>
      <div className="sell-acommpaniments">
        {accompaniment.map((item, i) => (
          <div className="acommpaniment">
            <button
              onClick={() => handleSelectAcompaniment(i, item)}
              className="acommpaniment-button"
            >
              <img
                src={item.img}
                className={`acommpaniment-img ${
                  acompId == i && "acommpaniment--selected"
                }`}
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Whey</h2>
      <div className="sell-whey">
        {wheyFlavor.map((item, i) => (
          <div className="whey">
            <button
              onClick={() => handleSelectWhey(i, item)}
              className="whey-button"
            >
              <img
                src={item.img}
                className={`whey-img ${wheyId == i && "whey--selected"}`}
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="sell-combos"></div>
      <div className="sell-buttons"></div>
    </div>
  );
}
