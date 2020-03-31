import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet'

import './styles.css';
import logoImg from '../../assets/logo.svg';
import errorImg from '../../assets/404.svg';

const ongId = localStorage.getItem('ongId');

export default function Page404() {
  return (
    <>
      <Helmet title="404 - Be The Hero" />
      <div className="error-container">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <div>
            <img src={errorImg} alt="Error 404" />
          </div>
          <Link to={ongId ? '/profile' : '/'} className="btn">Voltar</Link>
        </section>
      </div>
    </>
  );
}
