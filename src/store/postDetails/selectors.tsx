import { AppState } from 'store/rootReducer';

export const isLoading = (state: AppState) => state.postDetails && state.postDetails.isLoading;

export const hasError = (state: AppState) => state.postDetails && state.postDetails.hasError;

export const data = (state: AppState) => state.postDetails && state.postDetails.data;