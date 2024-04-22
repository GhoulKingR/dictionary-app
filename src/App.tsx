import { useEffect, useReducer } from "react";
import SearchResults from "./components/SearchResults";
import { Action, DispatchAction, Font } from "./libs/types";
import Header from "./components/Header";
import { initialState, reducer } from "./libs";
import { toClass } from "./libs/types";

async function fetchMeaning(text: string): Promise<any[]> {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
  const obj = await res.json();
  return [res.ok, obj];
}

function changeFont(font: Font, dispatch: React.Dispatch<Action> ) {
  dispatch({ type: DispatchAction.ChangeFont, data: font });
}

function setupHTML(html: HTMLHtmlElement, lightmode: boolean) {
  html.style.backgroundColor = !lightmode ? "#050505" : "white";
  html.style.color = !lightmode ? "white" : "#2d2d2d";
  html.style.transition = '0.4s';
}

async function search(text: string, dispatch: React.Dispatch<Action>) {
  dispatch({ type: DispatchAction.ChangeLooking, data: true });
  const [ok, obj] = await fetchMeaning(text);
  
  if (!ok) {
    dispatch({ type: DispatchAction.ChangeError, data: {
      happened: true,
      message: obj.message,
      resolution: obj.resolution,
      title: obj.title,
    }});
  } else {
    dispatch({ type: DispatchAction.ChangeError, data: { happened: false }});
    dispatch({ type: DispatchAction.SearchResult, data: obj });
  }

  dispatch({ type: DispatchAction.ChangeLooking, data: false });
  dispatch({ type: DispatchAction.ChangeLooked, data: true });
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) setupHTML(html, state.lightMode);
  }, [state.lightMode]);

  return (
    <>
      <Header
        lightMode={state.lightMode}
        toggleLightMode={() => dispatch({ type: DispatchAction.ToggleLightMode })}
        search={text => search(text, dispatch)}
        changeFont={(font) => changeFont(font, dispatch)}
        font={state.font}
      />
      <SearchResults
        searchResults={state.searchResults}
        looking={state.looking}
        looked={state.looked}
        error={state.error}
        className={toClass[state.font]}
        lightMode={state.lightMode}
        font={state.font}
      />
    </>
  )
}

export default App