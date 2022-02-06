export interface IState {
  data: {
    x: number;
    y: number;
  }[];
  x: number[];
  y: number[];
  fileName: string;
}

export interface IAction {
  type: "setData";
  payload: IState;
}
