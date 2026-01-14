import { useState } from "react";
import "./inventory.css";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useMyStore } from "../../store/store";

export default function Inventory() {
  const items = useMyStore();
  const [glass, setGlass] = useState(10);
  const [newPrice, setNewPrice] = useState({});

  function handleChangeGlassesQuant() {
    items.addToGlass(items.glassQuant + Number(glass));
  }

  function handleChangeGlassPrice(glass) {
    items.updateItem("glasses", glass.id, { price: newPrice[glass.id] });
    setNewPrice({ ...newPrice, [glass.id]: undefined });
  }

  function handleDeleteGlass(id) {
    items.removeItem("glasses", id);
  }

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
            <p>Excluir</p>
          </div>
          {items.glasses.map((item, i) => (
            <div className="glasses-glass" key={i}>
              <p className="glasses-glass-size">{item.size}</p>
              <p className="glasses-glass-price">R${item.price},00</p>
              <div className="glasses-newprice">
                <input
                  type="number"
                  className="newprice-input"
                  value={newPrice[item.id] || ""}
                  onChange={e =>
                    setNewPrice(prev => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                />
                <button className="newprice-button-add">
                  <AiOutlineCheck
                    onClick={() =>
                      handleChangeGlassPrice(item, newPrice[item.id])
                    }
                  />
                </button>
              </div>
              <div className="newprice-delete">
                <button
                  className="newprice-delete-button"
                  onClick={() => handleDeleteGlass(item.id)}
                >
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
