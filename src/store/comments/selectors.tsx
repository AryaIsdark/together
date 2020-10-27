import { AppState } from 'store/rootReducer';

export const isLoading = (state: AppState) => state.comments && state.comments.isLoading;

export const hasError = (state: AppState) => state.comments && state.comments.hasError;

export const data = (state: AppState) => state.comments && state.comments.data;