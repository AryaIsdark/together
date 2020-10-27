export enum ActionTypes {
  SET_DATA = "user/setData",
  SET_LOADING = "user/setLoading",
  SET_HAS_ERROR = "user/setHasError",
  SET_BOOKINGS = "user/setBookings",
}

export interface UserState {
  isLoading: boolean;
  hasError: boolean;
  data: any;
  bookings: any;
}

export interface Action {
  type: ActionTypes;
  payload: Partial<UserState>;
}
