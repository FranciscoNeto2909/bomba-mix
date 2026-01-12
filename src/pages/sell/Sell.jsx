import {
  accompaniments,
  combos,
  flavores,
  glasses,
  toppings,
  wheys,
} from "../../data/data";
import { SiBuymeacoffee } from "react-icons/si";
import { useState } from "react";
import "./sell.css";

export default function Sell() {
  const [glassId, setGlassId] = useState(undefined);
  const [glassSize, setGlassSize] = useState(undefined);
  const [glassPrice, setGlassPrice] = useState(undefined);
  const [flavorId, setFlavorId] = useState(undefined);
  const [flavor, setFlavor] = useState(undefined);
  const [topId, setTopId] = useState(undefined);
  const [top, setTop] = useState(undefined);
  const [acompId, setAcompId] = useState(undefined);
  const [acomp, setAcomp] = useState(undefined);
  const [wheyId, setWheyId] = useState(undefined);
  const [whey, setWhey] = useState(undefined);
  const [comboId, setComboId] = useState(undefined);
  const [combo, setCombo] = useState(undefined);
  const [order, setOrder] = useState(undefined);

  function handleSelectGlass(i, glass) {
    setGlassId(i);
    setGlassSize(glass.size);
    setGlassPrice(glass.price);
  }

  function handleSelectFlavor(i, flavor) {
    if (flavorId === i) {
      setFlavorId(undefined);
    } else {
      setFlavorId(i);
      setFlavor(flavor.name);
      setCombo(undefined);
      setComboId(undefined);
    }
  }

  function handleSelectTopping(i, top) {
    if (topId === i) {
      setTopId(undefined);
    } else setTopId(i);
    setTop(top.name);
  }

  function handleSelectAcompaniment(i, acomp) {
    if (acompId == i) {
      setAcompId(undefined);
    } else {
      setAcompId(i);
      setAcomp(acomp.name);
    }
  }

  function handleSelectWhey(i, item) {
    if (wheyId == i) {
      setWheyId(undefined);
    } else {
      setWheyId(i);
      setWhey(item.name);
    }
  }

  function handleSelectCombo(i, combo) {
    if (comboId === i) {
      setComboId(undefined);
    } else {
      setCombo(combo);
      setGlassPrice(combo.price);
      setComboId(i);
      setGlassId(undefined);
      setGlassSize(undefined);
      setFlavorId(undefined);
      setFlavor(undefined);
      setTopId(undefined);
      setTop(undefined);
      setAcompId(undefined);
      setAcomp(undefined);
      setWheyId(undefined);
      setWhey(undefined);
    }
  }

  function handleSetOrder() {
    if (comboId !== undefined) {
      setOrder({
        pedido: `Combo ${combo.name}`,
        valor: `R$:${combo.price},00`,
      });
      console.log(order);
    } else if (flavorId !== undefined) {
      setOrder({
        pedido: `Vitamina de ${flavor}`,
        copo: glassSize,
        cobertura: top,
        acompanha: acomp,
        whey,
        valor: `R$:${glassPrice},00`,
      });
      console.log(order);
    } else {
      console.log("Monte uma vitamina");
    }
  }

  return (
    <div className="sell">
      <h2 className="sell-title">Tamanhos</h2>
      <div className="sell-glasses">
        {glasses.map((glass, i) => (
          <div className="glass" key={i}>
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
          <div className="sell-flavor" key={i}>
            <button
              onClick={() => handleSelectFlavor(i, flavor)}
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
        {toppings.map((top, i) => (
          <div className="topping" key={i}>
            <button
              onClick={() => handleSelectTopping(i, top)}
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
        {accompaniments.map((item, i) => (
          <div className="acommpaniment" key={i}>
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
        {wheys.map((item, i) => (
          <div className="whey" key={i}>
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
      <h2 className="sell-title">Combos</h2>
      <div className="sell-combos">
        {combos.map((combo, i) => (
          <div className="combo" key={i}>
            <button
              onClick={() => handleSelectCombo(i, combo)}
              className="combo-button"
            >
              <img
                src={combo.img}
                className={`combo-img ${comboId == i && "combo--selected"}`}
                alt=""
              />
            </button>
          </div>
        ))}
      </div>
      <div className="sell-buttons">
        <button className="button" onClick={handleSetOrder}>
          Finalizar
        </button>
        <button className="button button--cancell">Cancelar</button>
      </div>
    </div>
  );
}
