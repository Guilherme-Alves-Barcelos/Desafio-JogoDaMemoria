import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import CampoTexto from "../../CampoTexto/index"

const CardEstilizado = styled.form`
  display: flex;
  justify-content: center;
  min-width: 600px;
  min-height:300px;
  background-color: rgb(233, 219, 73); 
  border-radius: 5px;
  border: 3px solid #0a0ac4;
  flex-direction: column;
  box-sizing: border-box;
  gap: 10px;
`
const TituloCard = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 25px;
    color: #0a0ac4;
`

const TextoLevel = styled.label`
    margin-left: 10px;
    font-size: 14px;
    color: #0a0ac4;
`

const SelectLevel = styled.select`
    width: 96%;
    height: 30px;
    border-radius: 5px;
    margin-left: 10px;
    color:  #0a0ac4;
`

const BotaoEstilizado = styled.button`
    width: 96%;
    height: 30px;
    border-radius: 5px;
    margin-left: 10px;
    color: rgb(233, 219, 73);
    background-color: #0a0ac4;
`

const Home = ({ userName, cadastreName, setSelectedLevel }) => {

    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const navigate = useNavigate();

    const toSaveFormName = (event) => {
        event.preventDefault();
        if (name && level) {
            cadastreName(name, level);
            setSelectedLevel(level); // Passando o nível selecionado para o componente App
            navigate('/game', { state: { userName: name } }); // Corrigindo a rota
            setName('');
            setLevel('');
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    return (
        <CardEstilizado onSubmit={toSaveFormName} >
            <TituloCard>
                Olá, Bem-Vindo {userName}!
            </TituloCard>
            <CampoTexto
                placeholder={'Digite seu nome'}
                value={name}
                toChanged={(value) => setName(value)}
            />
            <TextoLevel><strong>Escolha o nível:</strong></TextoLevel>
            <SelectLevel value={level} onChange={handleLevelChange} >
                <option ></option>
                <option value="Fácil">Fácil</option>
                <option value="Médio">Médio</option>
                <option value="Difícil">Difícil</option>
            </SelectLevel>
            <BotaoEstilizado type="submit" >
                Iniciar Jogo
            </BotaoEstilizado>
        </CardEstilizado>
    )
}

export default Home;