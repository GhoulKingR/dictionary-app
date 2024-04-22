import { SearchResult, Error, Font } from "../libs/types"
import { Results } from "./Results";
import { CSSProperties } from "react";

interface Props {
  searchResults: SearchResult[];
  looking: boolean;
  looked: boolean;
  error: Error;
  className: string;
  lightMode: boolean;
  font: Font;
}

export default function SearchResults({ searchResults, looking, looked, error, className, lightMode, font }: Props) {
  return (
    <main>
    {
      looking ? <Looking className={className} />
        : !looked ? <div></div>
          : error.happened ? <ErrorHappened error={error} className={className}/>
            : <Results searchResults={searchResults} className={className} lightMode={lightMode} font={font}/>
    }
    </main>
  )
}

interface EHProps {
  error: Error;
  className: string;
};
function ErrorHappened({ error, className }: EHProps) {
  const topLevel: CSSProperties = {
    textAlign: "center",
    flexDirection: "column",
    marginTop: "132px",
    paddingLeft: "80px",
    paddingRight: "80px",
    width: "calc(100vw - 160px)",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: '736px',
  };
  
  const emoji: CSSProperties = {
    fontSize: "64px",
    marginBottom: "44px",
  };
  
  const title: CSSProperties = {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "24px",
  }

  const p: CSSProperties = {
    color: "#757575",
    fontSize: "18px",
    lineHeight: "24px",
  };

  return <div style={topLevel} className={className}>
    <div style={emoji}>😕</div>
    <div style={title}>{error.title}</div>
    <p style={p}>
      {error.message} {error.resolution}
    </p>
  </div>
}

interface LProps {
  className: string;
};
function Looking ({className}: LProps) {
  const topContainer: CSSProperties = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
  };

  const inner: CSSProperties = {
    marginTop: "300px",
  };

  return <div style={topContainer} className={className}>
    <div style={inner}>Looking for your word...</div>
  </div>

}