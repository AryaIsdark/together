import { AppState } from "store/rootReducer";

export const isLoading = (state: AppState) =>
  state.user && state.user.isLoading;

export const hasError = (state: AppState) => state.user && state.user.hasError;

export const data = (state: AppState) => state.user && state.user.data;

export const bookings = (state: AppState) => state.user && state.user.bookings;
