import Logo from "../assets/images/logo.svg";
import styled from "styled-components";
import SelectFont from "./SelectFont";
import SearchForm from "./SearchForm";
import { Font } from "../libs/types";

interface Props {
  search: (text: string) => void;
  toggleLightMode: () => void;
  lightMode: boolean;
  changeFont: (font: Font) => void;
  font: Font;
};

function Header({search, lightMode, toggleLightMode, changeFont, font}: Props) {
  return (
    <header>
      <Container>
        <img className="logo" src={Logo} alt="logo" onClick={() => document.location.assign("")} />
        <div>
          <SelectFont changeFont={changeFont} font={font} lightMode={lightMode}/>
          <Toggle>
            <input type="checkbox" checked={!lightMode} onChange={toggleLightMode}/>
            <div></div>
          </Toggle>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
            <path
              fill="none" stroke={lightMode ? "#838383" : "#A445ED"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </div>
      </Container>
      <SearchForm search={search} lightMode={lightMode} font={font} />
    </header>
  )
}

export default Header;

const Toggle = styled.label`
  width: 40px;
  height: 20px;
  margin-right: 12px;

  input {
    display: none;
  }

  div {
    width: 40px;
    height: 20px;
    background-color: #757575;
    border-radius: 10px;
    position: relative;
    transition: .4s;
    -webkit-transition: .4s;
  }

  div::before {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 3px;
    left: 3px;
    background-color: white;
    content: "";
    border-radius: 7px;
    transition: .4s;
    -webkit-transition: .4s;
  }

  input:checked + div {
    background-color: #A445ED;
  }

  input:checked + div:before {
    left: 23px
  }
`

const Container = styled.header`
  display: flex;
  margin-left: 24px;
  margin-top: 24px;
  margin-right: 24px;
  width: calc(100vw - 48px);
  justify-content: space-between;
  max-width: 737px;
  
  & > div {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 28.05px;
    height: 32px;
  }

  @media (min-width: 768px) {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 58px;
    width: calc(100vw - 80px);

    .logo {
      width: 32px;
      height: 36.5px;
    }
  }

  @media (min-width: calc(737px + 80px)) {
    margin-left: auto;
    margin-right: auto;
  }
`;