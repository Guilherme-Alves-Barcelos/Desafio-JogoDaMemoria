import styled from "styled-components";
import '../src/App.css'
import Home from "./componentes/Pages/Home";
import EstilosGlobais from "./componentes/EstilosGlobais";
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from "./componentes/Menu";
import Pontuacao from "./componentes/Pages/Pontuacao/index.jsx";
import Game from "/src/componentes/Pages/Game/index.jsx";


const ContainerEstilizado = styled.div`
  background-image: url('/src/assets/Fundo.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const App = () => {

  const [userName, setUserName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  
  return (
    <>
      <BrowserRouter>
        <Menu />
        <ContainerEstilizado>
          <EstilosGlobais />
          <Routes>
            <Route path='/' element={<Home userName={userName} cadastreName={setUserName} setSelectedLevel={setSelectedLevel}/>} />
            <Route path='/game' element={<Game userName={userName} level={selectedLevel} />}/>
            <Route path='/pontuacao' element={<Pontuacao  userName={userName} level={selectedLevel}  />}/>
          </Routes>
        </ContainerEstilizado>
      </BrowserRouter>
    </>
  )
}

export default App
