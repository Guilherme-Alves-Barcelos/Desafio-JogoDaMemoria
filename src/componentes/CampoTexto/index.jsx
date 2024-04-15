import styled from "styled-components";

const CampoEstilizado = styled.input`
    width: 95%;
    height: 30px;
    border-radius: 5px;
    margin-left: 10px;
`

const CampoTexto = ({ value, toChanged, mandatory }) => {

    const toTyping = (event) => {
        toChanged(event.target.value)
    }

    return (
        <CampoEstilizado
            placeholder="Digite seu nome"
            value={value}
            onChange={toTyping}
            required={mandatory}
        />
    )
}

export default CampoTexto;