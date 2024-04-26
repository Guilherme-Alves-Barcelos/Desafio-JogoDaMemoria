import React, { useState, useEffect } from "react";
import styled from "styled-components";
import versoCard from "../../../assets/back.png";
import cardsGame from "../../../assets/jogo_memoria.json";
import { useLocation } from "react-router-dom";



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

const CardEstilo = styled.div`
  width: 600px;
  background-color: rgb(233, 219, 73);
  border: 3px solid #0a0ac4;
  border-radius: 5px;
  overflow: hidden;
  margin-left: 90px;
`;

const TabuleiroEstilizado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 1400px;
  height: auto;
  background-color: rgb(233, 219, 73);
  border-radius: 5px;
  margin-left: 90px;
`;

const ParagrafoP = styled.h2`
  color: #0a0ac4;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const CardImg = styled.img`
  width: 150px;
  height: 220px;
  margin: 10px;
  cursor: pointer;
`;

const Game = ({ userName, level }) => {
  
  const [tempo, setTempo] = useState(0);
  const [cartas, setCartas] = useState([]);
  const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState(0);
  const [paresCorretos, setParesCorretos] = useState([]);
  const [intervalId, setIntervalId] = useState(null); 
  const [jogoConcluido, setJogoConcluido] = useState(false); 

  useEffect(() => {
    const numberOfPairs = getNumberOfPairs(level);
    const shuffledCards = shuffleArray(cardsGame).slice(0, numberOfPairs); 
    const duplicatedCards = [...shuffledCards, ...shuffledCards];
    const finalCards = shuffleArray(duplicatedCards);
    setCartas(finalCards);

    const id = setInterval(() => {
      setTempo((tempo) => tempo + 1);
    }, 1000);

    setIntervalId(id); 

    return () => clearInterval(id);
  }, [level]);

  useEffect(() => {
    if (paresEncontrados === cartas.length / 2) {
      clearInterval(intervalId);
      localStorage.setItem(`${userName}_tempo`, tempo);
      setJogoConcluido(true);
    }
  }, [paresEncontrados, cartas.length, intervalId, tempo, userName]);

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getNumberOfPairs = (level) => {
    switch (level) {
      case "Fácil":
        return 4;
      case "Médio":
        return 8;
      case "Difícil":
        return 12;
      default:
        return;
    }
  };

  const handleCardClick = (index) => {
    if (cartasSelecionadas.length === 2 || cartasSelecionadas.includes(index)) {
      return;
    }

    const newCartasSelecionadas = [...cartasSelecionadas, index];
    setCartasSelecionadas(newCartasSelecionadas);

    if (newCartasSelecionadas.length === 2) {
      const [firstIndex, secondIndex] = newCartasSelecionadas;
      if (cartas[firstIndex].imageName === cartas[secondIndex].imageName) {
        setTimeout(() => {
          setParesEncontrados(paresEncontrados + 1);
          setParesCorretos([...paresCorretos, firstIndex, secondIndex]);
        }, 1000)
    
      }
      setTimeout(() => {
        setCartasSelecionadas([]);
      }, 1000);

      if (paresEncontrados + 1 === cartas.length / 2) {
        clearInterval(intervalId); 
      }
    }
  };

  return (
    <Container>
      <CardEstilo>
        <ParagrafoP>
          {userName} / Tempo: {tempo} segundos
        </ParagrafoP>
      </CardEstilo>
      <TabuleiroEstilizado>
        {cartas.map((card, index) => (
          !paresCorretos.includes(index) && (
            <CardImg
              key={index}
              src={cartasSelecionadas.includes(index) ? card.imageName : versoCard}
              alt="Carta"
              onClick={() => handleCardClick(index)}
            />
          )
        ))}
      </TabuleiroEstilizado>
    </Container>
  );
};

export default Game;
