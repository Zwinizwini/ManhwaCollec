import styled from "styled-components"

const SVGTrail = styled.svg`
  position: absolute;
  width: 20px;
  height: 100%;
  z-index: 5;
  left: 0;
`

const PathTrail = styled.path`
  stroke: url(#degradeStroke);
  stroke-width: 0.5px;
  fill: url(#degradePath);
`

const DivTrail = styled.div`
  position: relative;
  height: 25px;
  z-index: 2;
  top: 5px;
  left: 10px;
`

const DivName = styled.div`
  position: relative;
  text-shadow: 1px 1px #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffbb;
  margin-left: 10px;
  background: linear-gradient(to right, rgb(38, 23, 12, 0.6) 80%, transparent);
  padding: 0 10px;
  height: 100%;
  min-width: 60px;
  width: max-content;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, rgb(96, 85, 75, 0.6) 80%, transparent);
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, rgb(150, 143, 110, 0.6) 80%, transparent);
  }
`


const DivDialogue = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;

  & .border {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px);
    background: #666561;
  }

  & .txt {
    clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px), 0 5px);
    background-color: #f5f2e7;
    box-shadow: 
      inset 0 6px 4px -3px rgba(0, 0, 0, 0.4),
      inset 6px 0 4px -3px rgba(0, 0, 0, 0.3),
      inset -6px 0 4px -3px rgba(0, 0, 0, 0.3);
    padding: 10px;
    color: #36383c;
    min-width: 120px;
    width: max-content;
    max-width: 350px;
    min-height: 20px;
    text-align: center;
  }

  & .flecheDiv {
    position: absolute;
    left: 50%;
    transform: translate(-50%);

    & .fleche {
      width: 16px;
      height: 16px;
      clip-path: polygon(0 0, 14px 0, 16px 16px);
      background-color: #f5f2e7;
      transform: translateY(-1px);
    }

    & .borderFleche {
      position: absolute;
      top: 0;
      left: -2px;
      right: -2px;
      bottom: -4px;
      clip-path: polygon(0 0, calc(100% - 2px) 0, 100% 100%);
      background: #666561;
      z-index: -1;
    }
  }

  
`

const BoiteDialogue = styled.div`
  position: absolute;
  max-width: 600px;
  transition: all 0.2s ease;
  transform: translate(-56%, -130%);
  will-change: transform, left, top;
  pointer-events: none;
`

const TrailsDialog = ({nom,texte}) => {
  return (
    <BoiteDialogue>
      {/* élément Nom de perso */}
      <DivTrail>
        <SVGTrail viewBox="0 0 5 9">
          <defs>
            <linearGradient id="degradePath" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1d5f77"/>
              <stop offset="50%" stopColor="#3b8daa"/>
              <stop offset="100%" stopColor="#1d5f77"/>
            </linearGradient>
            <linearGradient id="degradeStroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0e8bc"/>
              <stop offset="100%" stopColor="#938c6b"/>
            </linearGradient>
          </defs>
          <PathTrail d="M 2 0 Q -1 4 2 9 L 5 9 Q 2 4 5 0 Z"/>
        </SVGTrail>

        <DivName>
          {nom}
        </DivName>
      </DivTrail>

      {/* boite de dialgue */}
      <DivDialogue>
        <div className="border"></div>
        <div className="txt">
          {texte}
        </div>
        <div className="flecheDiv">
          <div className="fleche"></div>
          <div className="borderFleche"></div>
        </div>
      </DivDialogue>
    </BoiteDialogue>
  )
}

export default TrailsDialog
