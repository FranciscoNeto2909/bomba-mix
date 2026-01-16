import { useState } from "react";
import { useMyStore } from "../../store/store";
import "./wellcome.css";
import { useNavigate } from "react-router-dom";

export default function Wellcome() {
  const navigate = useNavigate();
  const items = useMyStore();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin() {
    if ((name === "Liana" || name === "Natan") && pass === "bombamixsga123") {
      localStorage.setItem("isLogged", true);
      items.setMessage("Seja bem-vindo");
      navigate("/");
    } else {
      items.setMessage("Usuário não encontrado");
    }
  }
  return (
    <div className="wellcome">
      <h2 className="wellcome-title">Seja bem-vindo</h2>
      <p className="wellcome-desc">
        Este é o sistema de adminstração do BombaMix SGA
      </p>
      <p className="wellcome-desc">Por favor faça o login para continuar</p>
      <div className="wellcome-form">
        <form className="form">
          <div className="form-item">
            <label htmlFor="name" className="form-item-label">
              Nome
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-item-text"
              type="text"
            />
          </div>
          <div className="form-item">
            <label htmlFor="pass" className="form-item-label">
              Senha
            </label>
            <input
              value={pass}
              onChange={e => setPass(e.target.value)}
              className="form-item-text"
              type="text"
            />
          </div>
          <button
            className="form-item-button"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
