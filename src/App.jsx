import React, { useEffect, useState } from 'react';
import Jugador from './assets/Jugador';
import { Ruleta } from './Ruleta';

const createJugador = (nombre, montoInicial) => {
  return new Jugador(nombre, montoInicial);
}


function App() {

  const jugador = createJugador('Jugador 1', 800);

  return (
    <>
      <div>
        <Ruleta jugador={jugador} />
      </div>
    </>
  )
}

export default App
