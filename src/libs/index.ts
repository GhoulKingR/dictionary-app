import { State, Action, DispatchAction, Font } from "./types";

export const initialState: State = {
  searchResults: [],
  looking: false,
  looked: false,
  error: { happened: false },
  font: Font.Mono,
  lightMode: !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
};

export function reducer(state: State, action: Action): State {
  const {type} = action;

  switch (type) {
    case DispatchAction.SearchResult:
      return Object.assign({}, state, {
        searchResults: action.data,
      });
    case DispatchAction.ChangeLooking:
      return Object.assign({}, state, {
        looking: action.data,
      });
    case DispatchAction.ChangeLooked:
      return Object.assign({}, state, {
        looked: action.data,
      });
    case DispatchAction.ChangeError:
      return Object.assign({}, state, {
        error: action.data,
      });
    case DispatchAction.ToggleLightMode:
      return Object.assign({}, state, {
        lightMode: !state.lightMode,
      });
    case DispatchAction.ChangeFont:
      return Object.assign({}, state, {
        font: action.data,
      });
    default:
      return state;
  }
}

export function playSound(url: string) {
  var a = new Audio(url);
  return a.play();
}