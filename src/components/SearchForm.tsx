import { useState } from "react";
import Search from "../assets/images/icon-search.svg";
import styled from "styled-components";
import { Font, toClass } from "../libs/types";


interface Props {
  search: (text: string) => void;
  lightMode: boolean;
  font: Font;
}

function SearchForm({ search, lightMode, font }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  return (
    <Form
      className={`${lightMode?'':'dark'} ${error?'error':''} ${toClass[font]}`}
      onSubmit={e => {
        e.preventDefault();
        e.currentTarget.querySelector("input")?.blur();
        if (searchQuery.length === 0)
          setError(true);
        else {
          setError(false);
          search(searchQuery);
        }
      }
    }>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search for any word..."
      />
      <button>
        <img src={Search} alt="search" />
      </button>
      {error && <Error>Whoops, can't be empty...</Error>}
    </Form>
  )
}

export default SearchForm;

const Error = styled.div`
  color: #FF5252;
  top: calc(100% + 8px);
  position: absolute;
  left: 0px;
`;

const Form = styled.form`
  margin-left: auto;
  margin-right: auto;
  margin-top: 24px;
  width: calc(100vw - 48px);
  background-color: #f4f4f4;
  border-radius: 16px;
  height: 48px;
  display: flex;
  transition: background-color .4s, color .4s;
  max-width: 737px;
  position: relative;
  z-index: 0;

  &.error {
    border: 1px solid #FF5252;
  }

  &:focus-within {
    border: 1px solid #a445ed;
  }

  &.dark {
    background-color: rgba(255, 255, 255, 0.1);
    input {
      color: white;
    }
  }

  input {
    border: none;
    background-color: transparent;
    flex: 1;
    outline: none;
    padding: 0;
    padding-left: 24px;

    font-weight: bold;
    font-size: 16px;
    letter-spacing: 0px;
    z-index: 0;
  }

  button {
    background-color: transparent;
    border: none;
    height: 100%;
    padding: 0;
    padding-right: 16.45px;
    padding-left: 10px;

    img {
      width: 15.55px;
      height: 15.55px;
    }
  }

  @media (min-width: 768px) {
    margin-top: 51.5px;
    height: 64px;
  }
`