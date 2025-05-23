import React, { Suspense } from 'react';
import MenuLateral from '../../Componentes/MenuLateral';
import Rodape from '../../Componentes/Rodape';
import Carousel from '../../Componentes/Carousel';

function Home() {
  return (
    <div className="home-container">
      <MenuLateral />
      <main>
        <h2 className="home-heading">
          Bem-vindo ao Arte & Frequência - Explore Nosso Projeto
        </h2>
        <section>
          <p>
            Projeto Integrador com tecnologia para cadastro e acompanhamento de alunos.
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <Carousel />
          </Suspense>
        </section>
      </main>
      <Rodape />
    </div>
  );
}

export default Home;
