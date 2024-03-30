import { playSound } from "../libs"
import { Font, SearchResult } from "../libs/types"
import IconPlay from "../assets/images/icon-play.svg"
import IconPlaying from "../assets/images/icon-playing.svg"
import IconNewWindow from "../assets/images/icon-new-window.svg";
import styled from "styled-components";
import { useState } from "react";

const classes: any = {};
classes[Font.Mono] = "";
classes[Font.SansSerif] = "sserif";
classes[Font.Serif] = "serif";

interface Prop {
  searchResults: SearchResult[];
  className: string;
  lightMode: boolean;
  font: Font;
}
export function Results({searchResults, className, lightMode, font}: Prop) {
  const [playIcon, setPlayIcon] = useState(
    searchResults.map(() => IconPlay)
  );

  return (
    <>
      {
        searchResults.map((v, i) => {
          const { word, phonetics, meanings, sourceUrls } = v;
          const phonetic = phonetics.map(v => v.text).filter(v => v)[0];
          const audio = phonetics.map(v => v.audio).filter(v => v)[0];
          return <SearchResult key={i} className={className}>
            <WordHead>
              <div>
                <h1>{word}</h1>
                {phonetic && <div className="phonetic">{phonetic}</div>}
              </div>
              <div>
                {audio && <img src={playIcon[i]} alt="play sound" onClick={async () => {
                  if (playIcon[i] === IconPlay) {
                    const p1 = [...playIcon];
                    p1[i] = IconPlaying
                    setPlayIcon(p1);
                    await playSound(audio);
                    const p2 = [...playIcon];
                    p2[i] = IconPlay
                    setPlayIcon(p2);
                  }
                }} />}
              </div>
            </WordHead>

            {
              meanings.map((v, i) => {
                const {partOfSpeech, definitions, synonyms, antonyms} = v;
                return <Meaning key={i}>
                  <POSpeech className={classes[font]}>{partOfSpeech} <hr className={!lightMode ? 'dark' : ''} /></POSpeech>
                  <h3>Meaning</h3>
                  <ul>
                    {
                      definitions.map(({definition, example}, i) => (
                        <li key={i}>
                          <p>{definition}</p>
                          {example && <p className="example">"{example}"</p>}
                        </li>
                      ))
                    }
                  </ul>
                  {
                    synonyms.length > 0 &&
                    <Nym>
                      <h3>Synonyms</h3>
                      <div>{ synonyms.map((v, i) => <div key={i}>{v} </div>) }</div>
                    </Nym>
                  }
                  {
                    antonyms.length > 0 &&
                    <Nym>
                      <h3>Antonyms</h3>
                      <div>{ antonyms.map((v, i) => <div key={i}>{v}</div>) }</div>
                    </Nym>
                  }
                </Meaning>
              })
            }
            <hr className={!lightMode ? 'dark' : ''} />
            <SourceUrl>
              <a className="text" href={sourceUrls}>Source</a>
              <a className={`link ${!lightMode ? 'dark' : ''}`} href={sourceUrls}>{sourceUrls}</a>
              <img src={IconNewWindow} alt="new window" />
            </SourceUrl>
          </SearchResult>
        })
      }
    </>
  )
}

const WordHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
  }

  h1 {
    font-weight: bold;
    letter-spacing: 0px;
    font-size: 32px;
    margin-bottom: 9px;
  }

  & > div > div {
    color: #a445ed;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 64px;
    }

    img {
      width: 75px;
      height: 75px;
    }

    & > div > div {
      font-size: 24px;
      line-height: 29px;
    }
  }

  .phonetic {
    font-family: sans-serif !important;
  }
`;

const SearchResult = styled.div`
  margin-top: 28px;
  margin-left: 24px;
  margin-right: 24px;
  max-width: 737px;

  hr {
    border: none;
    background-color: #e9e9e9;
    height: 1px;
    margin-top: calc(32px - 13px);
    margin-bottom: 26px;

    &.dark {
      background-color: #3a3a3a;
    }
  }

  @media (min-width: 768px) {
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 50px;
  }

  @media (min-width: calc(737px + 80px)) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const POSpeech = styled.h2`
  display: flex;
  align-items: center;
  font-size: 18px;
  letter-spacing: 0px;
  font-weight: bold;
  margin-bottom: 34px;
  margin-top: 34px;
  
  hr {
    flex-grow: 1;
    height: 1px;
    border: none;
    background-color: #e9e9e9;
    margin: 0;
    margin-left: 25px;

    &.dark {
      background-color: #3a3a3a;
    }
  }

  &.serif, &.sserif {
    font-style: italic;
  }

  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 29px;

    &.serif {
      font-style: normal;
      font-family: sans-serif;
      font-weight: normal;
    }
  }
`;

const Meaning = styled.div`
  h3 {
    font-size: 16px;
    letter-spacing: 0px;
    font-weight: normal;
    margin-bottom: 17px;
    color: #757575;
  }

  ul {
    margin-bottom: 11px;

    li {
      list-style: none;
      padding-left: 25px;
      position: relative;
      margin-bottom: 13px;
      
      &::before {
        content: "";
        background-color: #8F19E8;
        width: 5px;
        height: 5px;
        display: block;
        border-radius: 2.5px;
        position: absolute;
        top: 10px;
        left: 0px;
      }

      .example {
        margin-top: 13px;
        color: #757575;
      }

      p {
        font-size: 15px;
        letter-spacing: 0px;
        line-height: 24px;
        font-weight: normal;

        @media (min-width: 768px) {
         font-size: 18px;
        }
      }
    }
  }
`;

const Nym = styled.div`
  display: flex;
  height: fit-content;

  h3 {
    margin: 0;
    margin-right: 39px;
  }

  & > div {
    color: #A445ED;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0px;

    & > div {
      display: inline;
      margin-right: 10px;
    }
  }
`;

const SourceUrl = styled.div`
  font-size: 14px;
  font-weight: normal;
  line-height: 17px;
  margin-bottom: 63px;
  
  .link {
    color: #2d2d2d;
    
    &.dark {
      color: white;
    }
  }
  
  img {
    margin-left: 8px;
    height: 12px;
    width: 12px;
  }
  
  .text {
    display: block;
    color: #757575;
    margin-bottom: 14px;
  }

  @media (min-width: 768px) {
    .text {
      display: inline;
      margin-right: 20px;
    }
  }
`;