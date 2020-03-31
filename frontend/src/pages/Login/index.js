import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet'
import { FiLogIn } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push("/profile");

      setTimeout(
        toast.info(`Conectado com sucesso!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        }), 3000);
    } catch (err) {
      toast.error("Erro ao tentar efetuar login.");
    }
  }

  return (
    <>
      <Helmet title="Login - Be The Hero" />
      <ToastContainer autoClose={5000} />
      <div className="login-container">
        <section className="form">
          <img src={logoImg} alt="Be The Hero" />
          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>
            <input
              placeholder="Sua ID"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button className="btn" type="submit">Entrar</button>
            <Link className="back-link" to="/register" >
              <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
          </form>
        </section>
        <img src={heroesImg} alt="Heroes" />
      </div>
    </>
  );
}
