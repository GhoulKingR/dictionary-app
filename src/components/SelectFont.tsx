import { useState } from "react";
import styled from "styled-components";
import IconArrowDown from "../assets/images/icon-arrow-down.svg";
import { Font, toClass } from "../libs/types";

const toText: any = {};
toText[Font.SansSerif] = "Sans Serif";
toText[Font.Serif] = "Serif";
toText[Font.Mono] = "Mono";

interface Props {
  changeFont: (font: Font) => void;
  font: Font;
  lightMode: boolean;
}

function SelectFont({changeFont: change, font, lightMode}: Props) {
  const [showOptions, setShowOptions] = useState(false);

  function changeFont(font: Font) {
    change(font);
    setShowOptions(false)
  }

  return (
    <Select>
      <div className="selectedFont" onClick={() => setShowOptions(!showOptions)}>
        <span className={toClass[font]}>{toText[font]}</span>
        <img src={IconArrowDown} alt="arrow down" />
      </div>
      { showOptions && <div className={`options ${lightMode ? '' : 'dark'}`}>
        <div className="SansSerif" onClick={() => changeFont(Font.SansSerif)}>{toText[Font.SansSerif]}</div>
        <div className="Serif" onClick={() => changeFont(Font.Serif)}>{toText[Font.Serif]}</div>
        <div className="Mono" onClick={() => changeFont(Font.Mono)}>{toText[Font.Mono]}</div>
      </div> }
    </Select>
  )
}

export default SelectFont;

const Select = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 14px;

  .selectedFont {
    font-weight: bold;
    line-height: 24px;
    letter-spacing: 0px;
    display: flex;
    align-items: center;
    padding-right: 16px;
    border-right: 1px solid #e9e9e9;
    margin-right: 16px;
    
    span {
      margin-right: 16px;
    }

    img {
      width: 12px;
      height: 6px;
    }
  }

  .options {
    position: absolute;
    right: 0;
    margin-top: 10.5px;
    width: 183px;
    height: auto;
    padding: 24px;
    padding-top: calc(24px - 16px);
    border-radius: 16px;
    box-shadow: 0 5px 30px 0px rgba(0, 0, 0, 0.1);
    background-color: white;
    font-weight: bold;
    box-shadow: 0px 5px 30px 0px rgba(0, 0, 0, 0.25);
    z-index: 1;

    &.dark {
      background-color: #050505;
      color: white;
      box-shadow: 0px 5px 30px 0px #a445ed;
    }

    div {
      margin-top: 16px;
      
      &:hover {
        color: #A445ED;
      }
    }
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;