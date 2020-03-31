import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { FiPower, FiMoon, FiSun, FiEdit, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  if (!ongId || !ongName) history.push('/');

  useEffect(() => {
    api.get("/profile", {
      headers: { Authorization: ongId }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
      toast.success("Caso deletado!");
    } catch (err) {
      toast.error("Erro ao tentar deletar o caso, tente novamente.");
    }
  }

  async function handleLogout() {
    localStorage.removeItem("ongId");
    localStorage.removeItem("ongName");
    await history.push('/');
    setTimeout(
      toast.info(`Deslogado com sucesso!`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      }), 3000);
  }

  const [darkMode, setDarkMode] = useState(handleTheme());
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    const isDark = JSON.parse(localStorage.getItem("darkMode"));
    isDark ? document.documentElement.classList.add('dark-mode') : document.documentElement.classList.remove('dark-mode');
  }, [darkMode]);

  function handleTheme() {
    let savedMode = JSON.parse(localStorage.getItem("darkMode"));
    if (!savedMode) savedMode = false;
    return savedMode;
  }

  return (
    <>
      <ToastContainer autoClose={5000} />
      <div className="profile-container">
        <Helmet title="Dashboard - Be The Hero" />
        <header>
          <img src={logoImg} alt="Be The Hero" />
          <span>Olá, {ongName}</span>
          <div className="button-container">
            <Link className="btn" to="/incidents/new">Cadastrar novo caso</Link>

            <button onClick={() => setDarkMode(prevMode => !prevMode)} type="button">
              {!darkMode ? <FiMoon size={18} color="rgb(23, 23, 33)" /> : <FiSun size={18} color="#ff0" />}
            </button>

            <button onClick={handleLogout} type="button">
              <FiPower size={18} color="#E02041" />
            </button>
          </div>
        </header>

        <h1>{incidents.length > 0 ? 'Meus casos cadastrados' : 'Você ainda não cadastrou nenhum caso.'}</h1>

        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO</strong>
              <p>{incident.description}</p>

              <strong>VALOR</strong>
              <p>{Intl.NumberFormat('pt-Br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#E02041" />
              </button>
            </li>
          ))}

        </ul>
      </div>
    </>
  );
}
