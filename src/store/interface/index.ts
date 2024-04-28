export interface UserState {
  name: string;
  jobNumber: string;
  token: string;
  permissions: string[];
  [key: string]: any;
}

export interface GlobalState {
  systemList: any[];
  [key: string]: any;
}
