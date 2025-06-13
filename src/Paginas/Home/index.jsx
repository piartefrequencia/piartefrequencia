import React, { Suspense } from 'react';
import MenuLateral from '../../Componentes/MenuLateral';
import Rodape from '../../Componentes/Rodape';
import Carousel from '../../Componentes/Carousel';
import Cabecalho from '../../Componentes/Cabecalho';

function Home() {
  return (
    <div className="home-container">
      <MenuLateral />
      <Cabecalho />
        <main className="home-heading">
          <h2>
            Bem-vindos ao Arte & Frequência!
          </h2>
          <section>
            <p>Projeto MÚSICA, DANÇA E TEATRO - Instrumentos de Cidadania.</p>
            <p>Aqui você conhece um pouco sobre o projeto, faz a inscrição da criança e/ou adolescente tudo online.</p>
         <Suspense fallback={<div>Loading...</div>}></Suspense>
          </section>
        </main>
        <div className="container mt-4">
          <Carousel />
        <div className="mt-4">
         
        </div>
       </div>
        <Rodape /> 
    </div>
  );
}

export default Home;
