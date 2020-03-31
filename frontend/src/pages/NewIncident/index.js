import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { FiArrowLeft } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  if (!ongId) history.push('/');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile');
      setTimeout(toast.success("Caso cadastrado com sucesso!"), 3000);
    } catch (err) {
      toast.error("Erro ao tentar cadastrar o caso, tente novamente.");
    }
  }

  return (
    <>
      <ToastContainer autoClose={5000} />
      <Helmet title="Cadastrar caso - Be The Hero" />
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso detalhadamente para que um herói possa resolver isto.</p>
            <Link className="back-link" to="/profile">
              <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
          </section>
          <form onSubmit={handleNewIncident}>
            <input
              placeholder="Título"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <input
              placeholder="Valor"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  );
}