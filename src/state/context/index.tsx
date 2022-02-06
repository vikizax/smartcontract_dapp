import { createContext } from "react";

import { IAction, IState } from "../model";

export const initialData: IState = {
  data: [],
  x: [],
  y: [],
  fileName: "",
};

export const AppContext = createContext({
  state: initialData,
  dispatch: (action: IAction) => {},
});
