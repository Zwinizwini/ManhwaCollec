import { useEffect, useState } from "react"
import styled from "styled-components"


const SabreLaserDiv = styled.div`
    width: 20px;
    height: 70px;
    background: rgb(87, 85, 85);
    position: relative;
    border-radius: 5px;
    &::after {
        content: '';
        position: absolute;
        border-top: 20px solid black;
        border-bottom: 20px solid black;
        width: 20px;
        height: 25px;
        top: 0;
        border-radius: 3px 3px 0 0;
    }
    & .btnRouge {
        position: absolute;
        background: red;
        top: 3px;
        left: -1px;
        width: 5px;
        height: 5px;
        border-radius: 1px 0 0 1px;
        z-index: 1;
        transition: all .2s ease-in-out;
    }
`

const Faisseau = styled.div`
    width: 12px;
    height: 150px;
    box-shadow: 0 0 5px #02e022;
    background: #a7f6a4;
    transition: all 1s ease-in-out;
    transform: scaleY(0);
    transform-origin: bottom;
    border-radius: 10px 10px 0 0;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 100px;
    left: 500px;
    position: absolute;
    z-index: 5;
    &:has(input:checked) #faisseau {
        transform: scaleY(1);
    }
    &:has(input:checked) .btnRouge {
        transform-origin: right;
        transform: scaleX(.7);
    }
    & input {
        display: none
    }
    & label {
        cursor: pointer;
    }
`

const SabreLaser = () => {
    const [pos, setPos] = useState({x:500,y:100})
    useEffect(() => {
        console.log(pos)
    },[pos])

    return (
        <Container onMouseDown={(e) => {setPos({x: e.clientX, y: e.clientY})}}
            style={{transform: `translate(${pos.x}px ${pos.y}px)`}}
            x={pos.x} y={pos.y}>
            <Faisseau id='faisseau'/>
            <SabreLaserDiv id='sabre'>
                <label className="btnRouge">
                    <input type="checkbox"/>
                </label>
            </SabreLaserDiv>
        </Container>
    )
}

export default SabreLaser
