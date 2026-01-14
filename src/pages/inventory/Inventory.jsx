import { useState } from "react";
import "./inventory.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useMyStore } from "../../store/store";

export default function Inventory() {
  const items = useMyStore();
  const [glass, setGlass] = useState(null);
  const [glassPrice, setGlassPrice] = useState({});
  const [comboPrice, setComboPrice] = useState({});

  function handleChangeGlassesQuant() {
    items.addToGlass(Number(glass));
    items.setMessage("Quantidade de copos atualizada");
  }

  function handleChangeGlassPrice(glass) {
    if (glassPrice[glass.id] > 0) {
      items.updateItem("glasses", glass.id, { price: glassPrice[glass.id] });
      setGlassPrice({ ...glassPrice, [glass.id]: undefined });
      items.setMessage("Preço do copo atualizado");
    }
  }

  function handleChangeComboPrice(combo) {
    if (comboPrice[combo.id] > 0) {
      items.updateItem("combos", combo.id, { price: comboPrice[combo.id] });
      setComboPrice({ ...comboPrice, [combo.id]: undefined });
      items.setMessage("Preço do combo atualizado");
    }
  }

  // function handleDelete(key, id) {
  //   items.removeItem(key, id);
  // }

  return (
    <div className="inventory">
      <h2 className="inventory-title">Estoque</h2>
      <div className="inventory-addglass">
        <p className="addglass-title">Adicionar copos</p>
        <div className="addglass-add">
          <input
            className="add-input"
            type="number"
            value={glass}
            onChange={e => setGlass(e.target.value)}
            autoFocus
          />
          <button className="add-button" onClick={handleChangeGlassesQuant}>
            Adicionar
          </button>
        </div>
      </div>
      <div className="inventory-updateGlass">
        <h2 className="updateGlass-title">Copos</h2>
        <div className="updateGlass-glasses">
          <div className="glasses-desc">
            <p>Tamanho</p>
            <p>Preço Atual</p>
            <p>Novo Preço</p>
            {/* <p>Excluir</p> */}
          </div>
          {items.glasses.map((item, i) => (
            <div className="glasses-glass" key={i}>
              <p className="glasses-glass-size">{item.size}</p>
              <p className="glasses-glass-price">R${item.price},00</p>
              <div className="glasses-newprice">
                <input
                  type="number"
                  className="newprice-input"
                  value={glassPrice[item.id] || ""}
                  onChange={e =>
                    setGlassPrice(prev => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                />
                <button className="newprice-button-add">
                  <AiOutlineCheck
                    onClick={() =>
                      handleChangeGlassPrice(item, glassPrice[item.id])
                    }
                  />
                </button>
              </div>
              {/* <div className="newprice-delete">
                <button
                  className="newprice-delete-button"
                  onClick={() => handleDelete("glasses", item.id)}
                >
                  <AiOutlineClose />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="inventory-updatecombos">
        <h2 className="combos-title">Combos</h2>
        <div className="combos-desc">
          <p>Combo</p>
          <p>Preço Atual</p>
          <p>Novo Preço</p>
          {/* <p>Excluir</p> */}
        </div>
        {items.combos.map((item, i) => (
          <div className="combos-combo" key={i}>
            <p className="combos-combo-name">{item.name}</p>
            <p className="combos-combo-price">R${item.price},00</p>
            <div className="cmbos-newprice">
              <input
                type="number"
                className="newprice-input"
                value={comboPrice[item.id] || ""}
                onChange={e =>
                  setComboPrice(prev => ({
                    ...prev,
                    [item.id]: e.target.value,
                  }))
                }
              />
              <button className="newprice-button-add">
                <AiOutlineCheck
                  onClick={() =>
                    handleChangeComboPrice(item, comboPrice[item.id])
                  }
                />
              </button>
            </div>
            {/* <div className="newprice-delete">
              <button
                className="newprice-delete-button"
                onClick={() => handleDelete("combos", item.id)}
              >
                <AiOutlineClose />
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
