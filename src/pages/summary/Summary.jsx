import { useEffect, useState } from "react";
import "./summary.css";
import { AiOutlineClose } from "react-icons/ai";
import { useMyStore } from "../../store/store";

export default function Summary() {
  const items = useMyStore();
  const [bombamix, setBombamix] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [order, setOrder] = useState();
  const [modalOpened, setModalOpened] = useState(false);
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const mensagem = `
📊 *Resumo de Vendas ${dataHoje}*

🥤 Bombamix: R$ ${bombamix.toFixed(2).replace(".", ",")}
🛵 Delivery: R$ ${delivery.toFixed(2).replace(".", ",")}

💰 *Total Geral*: R$ ${(bombamix + delivery).toFixed(2).replace(".", ",")}
`;

  function handleCloseBox() {
    const texto = encodeURIComponent(mensagem);
    const url = `https://wa.me/5585996260929?text=${texto}`;
    window.open(url, "_blank");
    items.clearSales();
  }

  function handleOpenModal(order) {
    setModalOpened(true);
    setOrder(order);
    document.body.style.overflow = "hidden";
  }

  function handleRemoveOrder() {
    items.removeOrder(order);
    items.setMessage("Pedido removido");
    console.log(order);
    if (order.pedido.includes("Combo")) {
      items.addComboGlass(order.copo.id, order.copo.id2, order.quantidade);
    } else {
      items.addGlass(order.copo.id, order.quantidade);
    }
    handleCloseModal();
  }

  function handleCloseModal() {
    setModalOpened(false);
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    setBombamix(
      items.sales.bombamix.reduce((sum, item) => {
        const valorNumerico = Number(
          item.valor.replace("R$:", "").replace(",", "."),
        );
        return sum + valorNumerico;
      }, 0),
    );

    setDelivery(
      items.sales.delivery.reduce((sum, item) => {
        const valorNumerico = Number(
          item.valor.replace("R$:", "").replace(",", "."),
        );
        return sum + valorNumerico;
      }, 0),
    );
  }, [items.sales]);

  return (
    <div className="summary">
      {modalOpened && (
        <div className="sumary-modal">
          <div className="modal">
            <p className="modal-text">Remover esse pedido?</p>
            <div className="modal-buttons">
              <button
                className="modal-button button"
                onClick={handleRemoveOrder}
              >
                Sim
              </button>
              <button
                className="modal-button button"
                onClick={handleCloseModal}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="summary-title">
        <h2>Fechamento</h2>
      </div>
      <div className="summary-bombamix">
        <h3 className="bombamix-title">Vendas no BombaMix</h3>
        <div className="sales-item">
          <p className="item-quant">Quant</p>
          <p className="item-name bombamix-name">Sabor</p>
          <p className="item-payment">Pagamento</p>
          <p className="item-value">Valor</p>
        </div>
        <div className="bombamix-sales">
          {items.sales.bombamix.map((item, i) => (
            <div className="sales-item" key={i}>
              <p className="item-quant">{item.quantidade}</p>
              <p className="item-name">{item.pedido}</p>
              <p className="item-payment">{item.pagamento}</p>
              <p className="item-value">{item.valor}</p>
              <button
                className="item-close"
                onClick={() => handleOpenModal(item)}
              >
                <AiOutlineClose size={18} />
              </button>
            </div>
          ))}
          {items.sales.bombamix.length > 0 && (
            <div className="sales-sum">
              <p className="sales-sum-text">Total:</p>
              <div className="sales-sum-text">
                R${bombamix.toFixed(2).replace(".", ",")}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="summary-delivery">
        <h3 className="delivery-title">Vendas no +Delivery</h3>
        <div className="sales-item">
          <p className="item-quant">Quant</p>
          <p className="item-name bombamix-name">Sabor</p>
          <p className="item-payment">Pagamento</p>
          <p className="item-value">Valor</p>
        </div>
        <div className="delivery-sales">
          {items.sales.delivery.map((item, i) => (
            <div className="sales-item" key={i}>
              <p className="item-quant">{item.quantidade}</p>
              <p className="item-name">{item.pedido}</p>
              <p className="item-payment">{item.pagamento}</p>
              <p className="item-value">{item.valor}</p>
              <button
                className="item-close"
                onClick={() => handleOpenModal(item)}
              >
                <AiOutlineClose size={18} />
              </button>
            </div>
          ))}
          {items.sales.delivery.length > 0 && (
            <div className="sales-sum">
              <p className="sales-sum-text">Total:</p>
              <div className="sales-sum-text">
                R${delivery.toFixed(2).replace(".", ",")}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="summary-button">
        <button onClick={handleCloseBox}>Fechar caixa</button>
      </div>
    </div>
  );
}
