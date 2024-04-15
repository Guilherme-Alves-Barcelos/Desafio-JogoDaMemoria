import styled from "styled-components";
import MenuLinks from "../MenuLinks/index"

const CabecalhoEstilo = styled.header`
    display: flex;
    justify-content: center;
    background-color: rgb(233, 219, 73);
    border: 3px solid blue;
`

const MenuEstilizado = styled.nav`
  display: flex;
  gap: 300px;
`

const Menu = () => {
    return (
        <CabecalhoEstilo>
            <MenuEstilizado>
                <MenuLinks to="/">
                    Home
                </MenuLinks >
                <MenuLinks to="/game">
                    Game
                </MenuLinks>
                <MenuLinks to="/pontuacao">
                    Pontuação
                </MenuLinks>
            </MenuEstilizado>
        </CabecalhoEstilo>
    )
}

export default Menu;