import styled from "styled-components";
import React, { useState, useEffect } from "react";
import versoCard from "../../../assets/back.png";
import cardsGame from "../../../assets/jogo_memoria.json";
import { useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: auto;
    background-color: rgb(233, 219, 73);
    border: 3px solid #0a0ac4;
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

const Game = ({ level }) => {
    const location = useLocation();
    const userName = location.state.userName;

    const [tempo, setTempo] = useState(0);
    const [cartas, setCartas] = useState([]);
    const [cartasSelecionadas, setCartasSelecionadas] = useState([]);
    const [paresEncontrados, setParesEncontrados] = useState(0);
    const [paresCorretos, setParesCorretos] = useState([]);

    useEffect(() => {
        const numberOfPairs = getNumberOfPairs(level);
        const shuffledCards = shuffleArray(cardsGame).slice(0, numberOfPairs); // Selecionar cartas conforme o número de pares
        const duplicatedCards = [...shuffledCards, ...shuffledCards]; // Duplicar as cartas para formar os pares
        const finalCards = shuffleArray(duplicatedCards); // Embaralhar novamente para distribuir os pares
        setCartas(finalCards);

        const intervalId = setInterval(() => {
            setTempo(tempo => tempo + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [level]);

    const shuffleArray = (array) => {
        const shuffledArray = array.slice(); // Clonar o array original
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const getNumberOfPairs = (level) => {
        switch (level) {
            case "Fácil":
                return 3; // 3 pares para o nível fácil
            case "Médio":
                return 6; // 6 pares para o nível médio
            case "Difícil":
                return 9; // 12 pares para o nível difícil
            default:
                return 3;
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
                setParesEncontrados(paresEncontrados + 1);
                setParesCorretos([...paresCorretos, firstIndex, secondIndex]);
            }
            setTimeout(() => {
                setCartasSelecionadas([]);
            }, 1000);
        }
    };

    return (
        <Container>
            <CardEstilo>
                <ParagrafoP>
                    {userName} /
                    Tempo: {tempo} segundos
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
