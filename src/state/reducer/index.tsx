import { IState, IAction } from "../model";
export const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
