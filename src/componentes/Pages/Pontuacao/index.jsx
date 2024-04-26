import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const ContainerEstilizado = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: auto;
  background-color: rgb(233, 219, 73);
  border: 3px solid #0a0ac4;
  border-radius: 5px;
  margin-top: 10px;
  color: black;
`;

const TituloEstilizado = styled.h1`
  width: 300px;
  border-radius: 5px;
  border: 3px solid #0a0ac4;
  background-color: rgb(233, 219, 73);
  color: #0a0ac4;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Botao = styled.button`
  background-color: #0a0ac4;
  color: white;
  border: 3px solid  rgb(233, 219, 73);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
`;

const Pontuacao = ({ userName, level }) => {
    useEffect(() => {
        salvarPontuacao();
    }, []);

    const salvarPontuacao = () => {
        const key = `${userName}_tempo_${Date.now()}`; 
        localStorage.setItem(key, Date.now()); 
    };

    const pontuacoes = Object.keys(localStorage)
        .filter(key => key.startsWith(`${userName}_tempo`))
        .map(key => parseInt(localStorage.getItem(key)))
        .filter(score => !isNaN(score))
        .sort((a, b) => a - b);

    const melhorPontuacao = Math.min(...pontuacoes);

    return (
        <Container>
            <TituloEstilizado>Pontuações de {userName}</TituloEstilizado>
            {pontuacoes.length > 0 ? (
                <ContainerEstilizado>
                    <h2>Nível: {level}</h2>
                    <p>Melhor Pontuação: {melhorPontuacao} segundos</p>
                    <p>Todas as Pontuações:</p>
                    <ul>
                        {pontuacoes.map((pontuacao, index) => (
                            <li key={index}>{pontuacao} segundos</li>
                        ))}
                    </ul>
                </ContainerEstilizado>
            ) : (
                <ContainerEstilizado>
                    <p>Nenhuma pontuação registrada para este usuário.</p>
                </ContainerEstilizado>
            )}
            <Botao as={Link} to="/" onClick={salvarPontuacao}>Novo Jogo</Botao>
        </Container>
    );
};

export default Pontuacao;
