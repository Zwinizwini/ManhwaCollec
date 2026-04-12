import E404 from '../assets/Error404.png'
import styled from 'styled-components'

const Img = styled.img`
    width: 80%;
`
const DivError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
`

const Error = () => {
    return (
        <DivError>
            <Img src={E404} alt="Erreur 404" />
        </DivError>
    )
}

export default Error