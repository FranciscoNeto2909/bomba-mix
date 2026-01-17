import { SiBuymeacoffee } from "react-icons/si";
import { useState } from "react";
import { useMyStore } from "../../store/store";
import "./sell.css";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";

export default function Sell({ handleSetSell }) {
  const items = useMyStore();
  const [glassQuant, setGlassQuant] = useState(1);

  const [glass, setGlass] = useState({
    id: null,
    size: null,
    price: null,
  });

  const [comboIds, setComboIds] = useState({ size: null, size2: null });
  const [flavor, setFlavor] = useState({ id: null, name: null });
  const [top, setTop] = useState({ id: null, name: null });
  const [acomp, setAcomp] = useState({ id: null, name: null });
  const [combo, setCombo] = useState({ id: null, name: null, price: null });
  const [pickUp, setPickUp] = useState({ id: 1, value: "Bombamix" });
  const [payment, setPayment] = useState({ id: 1, value: "Dinheiro" });

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

  function handleSelectCombo(i, item) {
    if (combo.id === i) {
      setCombo({ id: null, name: null, price: null });
    } else {
      setComboIds({ id: item.size, id2: item.size2 });
      setCombo({ id: i, name: item.name, price: item.price });
      setGlass({ id: null, size: null, price: null });
      setFlavor({ id: null, name: null });
      setTop({ id: null, name: null });
      setAcomp({ id: null, name: null });
    }
  }

  function handleSetOrder() {
    const isDelivery = pickUp.id !== 1;
    const glassPrice =
      payment.id === 4
        ? glass.price * glassQuant + 0.5
        : glass.price * glassQuant;
    const comboPrice =
      payment.id === 4
        ? combo.price * glassQuant + 0.5
        : combo.price * glassQuant;

    if (combo.id !== null) {
      handleSetSell(
        {
          pedido: `Combo ${combo.name}`,
          quantidade: glassQuant,
          delivery: isDelivery,
          copo: comboIds,
          pagamento: payment.value,
          valor: `R$:${comboPrice.toFixed(2).replace(".", ",")}`,
        },
        glassQuant,
      );
      setCombo({ id: null, name: null, price: null });
      setPayment({ id: 1, value: "Dinheiro" });
      setGlassQuant(1);
      setPickUp({ id: 1, value: "Bombamix" });
      items.setMessage("Combo adicionado");
    } else if (glass.id !== null && flavor.id !== null) {
      handleSetSell(
        {
          pedido: `${flavor.name}`,
          quantidade: glassQuant,
          delivery: isDelivery,
          copo: glass,
          cobertura: top.name ?? "Sem cobertura",
          acompanha: acomp.name ?? "Sem acompanhamento",
          pagamento: payment.value,
          valor: `R$:${glassPrice.toFixed(2).replace(".", ",")}`,
        },
        glassQuant,
      );
      setGlass({ id: null, size: null, price: null });
      setFlavor({ id: null, name: null });
      setTop({ id: null, name: null });
      setAcomp({ id: null, name: null });
      setPayment({ id: 1, value: "Dinheiro" });
      setGlassQuant(1);
      setPickUp({ id: 1, value: "Bombamix" });
      items.setMessage("Vitamina adicionada");
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
    setDelivery(false);
    setPayment({ id: 1, value: "Dinheiro" });
    setGlassQuant(1);
    setPickUp({ id: 1, value: "Bombamix" });
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
              <div className="glass-icon">
                <SiBuymeacoffee size={item.iconS} className="glass-icon" />
                <span
                  className={`icon-quant ${
                    i === glass.id ? "icon-quant--selected" : ""
                  }`}
                >
                  {item.quant}
                </span>
              </div>
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
        <h2 className="delivery-text">Retirada</h2>
        <div className="buttons-delivery">
          <button
            className={`delivery-button ${
              pickUp.id === 1 ? "delivery-button--selected" : ""
            }`}
            onClick={() => setPickUp({ id: 1, value: "Bombamix" })}
          >
            BombaMix
          </button>
          <button
            className={`delivery-button ${
              pickUp.id === 2 ? "delivery-button--selected" : ""
            }`}
            onClick={() => setPickUp({ id: 2, value: "+Delivery" })}
          >
            +Delivery
          </button>
        </div>
        <div className="buttons-glassQuant">
          <span className="glassQuant-title">Quantidade</span>
          <button
            className={`glassQuant-button ${
              glassQuant === 1 ? "glassQuant-button--unvailable" : ""
            }`}
            onClick={() => glassQuant > 1 && setGlassQuant(glassQuant - 1)}
          >
            <AiOutlineMinus size={25} />
          </button>
          <span>{glassQuant}</span>
          <button
            className="glassQuant-button"
            onClick={() => setGlassQuant(glassQuant + 1)}
          >
            <IoAddOutline size={25} />
          </button>
        </div>
        <div className="buttons-payment">
          <button
            className={`payment-button ${
              payment.id === 1 ? "payment-button--selected" : ""
            }`}
            onClick={() => setPayment({ id: 1, value: "Dinheiro" })}
          >
            dinheiro
          </button>
          <button
            className={`payment-button ${
              payment.id === 2 ? "payment-button--selected" : ""
            }`}
            onClick={() => setPayment({ id: 2, value: "Pix" })}
          >
            Pix
          </button>
          <button
            className={`payment-button ${
              payment.id === 3 ? "payment-button--selected" : ""
            }`}
            onClick={() => setPayment({ id: 3, value: "Débito" })}
          >
            Débito
          </button>
          <button
            className={`payment-button ${
              payment.id === 4 ? "payment-button--selected" : ""
            }`}
            onClick={() => setPayment({ id: 4, value: "Crédito" })}
          >
            Crédito
          </button>
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
