import { useEffect, useState } from "react";
import "./summary.css";

export default function Summary({ sales }) {
  const [bombamix, setBombamix] = useState(0);
  const [delivery, setDelivery] = useState(0);

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  const mensagem = `
📊 *Resumo de Vendas ${dataHoje}*

🥤 Bombamix: R$ ${bombamix.toFixed(2).replace(".", ",")}
🛵 Delivery: R$ ${delivery.toFixed(2).replace(".", ",")}

💰 *Total Geral*: R$ ${(bombamix + delivery).toFixed(2).replace(".", ",")}
`;

  function handleCloseBox() {
    console.log(mensagem);
    const texto = encodeURIComponent(mensagem);
    const url = `https://wa.me/5585996260929?text=${texto}`;
    window.open(url, "_blank");
  }

  useEffect(() => {
    setBombamix(
      sales.bombamix.reduce((sum, item) => {
        const valorNumerico = Number(
          item.valor.replace("R$:", "").replace(",", ".")
        );
        return sum + valorNumerico;
      }, 0)
    );

    setDelivery(
      sales.delivery.reduce((sum, item) => {
        const valorNumerico = Number(
          item.valor.replace("R$:", "").replace(",", ".")
        );
        return sum + valorNumerico;
      }, 0)
    );
  }, [sales]);

  return (
    <div className="summary">
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
          {sales.bombamix.map((item, i) => (
            <div className="sales-item" key={i}>
              <p className="item-quant">{item.quantidade}</p>
              <p className="item-name">{item.pedido}</p>
              <p className="item-payment">{item.pagamento}</p>
              <p className="item-value">{item.valor}</p>
            </div>
          ))}
          {sales.bombamix.length > 0 && (
            <div className="sales-sum">
              <p className="sales-sum-text">Total:</p>
              <div className="sales-sum-text">R${bombamix},00</div>
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
          {sales.delivery.map((item, i) => (
            <div className="sales-item" key={i}>
              <p className="item-quant">{item.quantidade}</p>
              <p className="item-name">{item.pedido}</p>
              <p className="item-payment">{item.pagamento}</p>
              <p className="item-value">{item.valor}</p>
            </div>
          ))}
          {sales.delivery.length > 0 && (
            <div className="sales-sum">
              <p className="sales-sum-text">Total:</p>
              <div className="sales-sum-text">R${delivery},00</div>
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
