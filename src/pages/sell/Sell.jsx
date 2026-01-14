import { SiBuymeacoffee } from "react-icons/si";
import { useState } from "react";
import { useMyStore } from "../../store/store";
import "./sell.css";

export default function Sell({ handleSetSell }) {
  const items = useMyStore();

  const [glass, setGlass] = useState({
    id: null,
    size: null,
    price: null,
  });
  const [flavor, setFlavor] = useState({ id: null, name: null });
  const [top, setTop] = useState({ id: null, name: null });
  const [acomp, setAcomp] = useState({ id: null, name: null });
  const [whey, setWhey] = useState({ id: null, name: null });
  const [combo, setCombo] = useState({ id: null, name: null, price: null });
  const [delivery, setDelivery] = useState(false);

  function handleSelectGlass(i, item) {
    if (glass.id === i) {
      setGlass({ ...glass, id: null });
    } else {
      setGlass({ id: i, size: item.size, price: item.price });
    }
  }

  function handleSelectFlavor(i, item) {
    if (flavor.id === i) {
      setFlavor({ id: null, name: null });
    } else {
      setFlavor({ id: i, name: item.name });
      setCombo({ id: null, name: null, price: null });
    }
  }

  function handleSelectTopping(i, item) {
    if (top.id === i) {
      setTop({ id: null, name: null });
    } else setTop({ id: i, name: item.name });
  }

  function handleSelectAcompaniment(i, item) {
    if (acomp.id === i) {
      setAcomp({ id: null, name: null });
    } else {
      setAcomp({ id: i, name: item.name });
    }
  }

  function handleSelectWhey(i, item) {
    if (whey.id === i) {
      setWhey({ id: null, name: null });
    } else {
      setWhey({ id: i, name: item.name });
    }
  }

  function handleSelectCombo(i, item) {
    if (combo.id === i) {
      setCombo({ id: null, name: null, price: null });
    } else {
      setCombo({ id: i, name: item.name, price: item.price });
      setGlass({ id: null, size: null, price: null });
      setFlavor({ id: null, name: null });
      setTop({ id: null, name: null });
      setAcomp({ id: null, name: null });
      setWhey({ id: null, name: null });
    }
  }

  function handleSetOrder() {
    if (combo.id !== null) {
      handleSetSell({
        pedido: `${combo.name}`,
        delivery,
        valor: `R$:${combo.price},00`,
      });
      setCombo({ id: null, name: null, price: null });
      setDelivery(false);
      items.setMessage("Bomba adicionada");
      setTimeout(() => {
        setMessage({ hasMsg: false, msg: "" });
      }, 2000);
    } else if (glass.id !== null && flavor.id !== null) {
      handleSetSell({
        pedido: `Vitamina de ${flavor.name}`,
        delivery,
        copo: glass.size,
        cobertura: top.name ?? "Sem cobertura",
        acompanha: acomp.name ?? "Sem acompanhamento",
        whey: whey.name ?? "Sem whey",
        valor: `R$:${glass.price},00`,
      });
      setGlass({ id: null, size: null, price: null });
      setFlavor({ id: null, name: null });
      setTop({ id: null, name: null });
      setAcomp({ id: null, name: null });
      setWhey({ id: null, name: null });
      setDelivery(false);
      items.setMessage("Vitamina adicionada");
      setTimeout(() => {
        setMessage({ hasMsg: false, msg: "" });
      }, 2000);
    } else {
      items.setMessage("Selecione uma vitamina");
    }
  }

  function handleCancelOrder() {
    setCombo({ id: null, name: null, price: null });
    setGlass({ id: null, size: null, price: null });
    setFlavor({ id: null, name: null });
    setTop({ id: null, name: null });
    setAcomp({ id: null, name: null });
    setWhey({ id: null, name: null });
    setDelivery(false);
  }

  return (
    <div className="sell">
      <h2 className="sell-title">Tamanhos</h2>
      <div className="sell-glasses">
        {items.glasses.map((item, i) => (
          <div className="glass" key={i}>
            <button
              onClick={() => handleSelectGlass(i, item)}
              className={`glass-button ${
                i === glass.id ? "glass--selected" : ""
              }`}
            >
              <SiBuymeacoffee size={item.iconS} className="glass-icon" />
              <div className="glass-texts">
                <span className="glass-size">{item.size}</span>
                <p className="sell-glass-price">R$:{item.price},00</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Sabores</h2>
      <div className="sell-flavors">
        {items.flavors.map((item, i) => (
          <div className="sell-flavor" key={i}>
            <button
              onClick={() => handleSelectFlavor(i, item)}
              className="flavor-button"
            >
              <img
                className={`flavor-img ${
                  flavor.id === i ? "flavor--selected" : ""
                }`}
                src={item.img}
                alt=""
              />
              <p className="flavor-name">{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Coberturas</h2>
      <div className="sell-topping">
        {items.toppings.map((item, i) => (
          <div className="topping" key={i}>
            <button
              onClick={() => handleSelectTopping(i, item)}
              className="topping-button"
            >
              <img
                src={item.img}
                className={`topping-img ${
                  top.id === i ? "topping--selected" : ""
                }`}
                alt=""
              />
              <p className="topping-name">{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Acompanhamento</h2>
      <div className="sell-acommpaniments">
        {items.accompaniments.map((item, i) => (
          <div className="acommpaniment" key={i}>
            <button
              onClick={() => handleSelectAcompaniment(i, item)}
              className="acommpaniment-button"
            >
              <img
                src={item.img}
                className={`acommpaniment-img ${
                  acomp.id === i ? "acommpaniment--selected" : ""
                }`}
                alt=""
              />
              <p className="acommpaniment-name">{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Whey</h2>
      <div className="sell-whey">
        {items.wheys.map((item, i) => (
          <div className="whey" key={i}>
            <button
              onClick={() => handleSelectWhey(i, item)}
              className="whey-button"
            >
              <img
                src={item.img}
                className={`whey-img ${whey.id === i ? "whey--selected" : ""}`}
                alt=""
              />
              <p className="whey-name">{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <h2 className="sell-title">Combos</h2>
      <div className="sell-combos">
        {items.combos.map((item, i) => (
          <div className="combo" key={i}>
            <button
              onClick={() => handleSelectCombo(i, item)}
              className="combo-button"
            >
              <img
                src={item.img}
                className={`combo-img ${
                  combo.id === i ? "combo--selected" : ""
                }`}
                alt=""
              />
              <p className="combo-name">{item.name}</p>
            </button>
          </div>
        ))}
      </div>
      <div className="sell-buttons">
        <div className="buttons-delivery">
          <span className="delivery-text">+Delivery</span>
          <input
            checked={delivery}
            onChange={() => setDelivery(!delivery)}
            className="delivery-box"
            type="checkbox"
          />
        </div>
        <button className="button" onClick={handleSetOrder}>
          Finalizar
        </button>
        <button className="button button--cancell" onClick={handleCancelOrder}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
