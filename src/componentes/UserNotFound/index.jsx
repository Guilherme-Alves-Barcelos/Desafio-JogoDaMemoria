import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    min-height: 100vh;
`

const UserNotFound = () => {
    return(
        <Container>
        <h1>Você ainda não está logado</h1>
        <div onClick={() => navigate('/game')}>
          <Button >
            Voltar para a Home
          </Button>
        </div>
        </Container>
    )
} 

export default UserNotFound;