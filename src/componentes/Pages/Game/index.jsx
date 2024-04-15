import styled from "styled-components";


const CardEstilo = styled.div`
    width: 300px;
    height: 200px;
    background-color: aliceblue;
`
const ParagrafoP = styled.p`
    color: red;
    font-size: 30px;
`

const Game = ({ userName }) => {
    return(
        <CardEstilo>
            <ParagrafoP>asasasasas</ParagrafoP>
        </CardEstilo>
    )
}

export default Game;