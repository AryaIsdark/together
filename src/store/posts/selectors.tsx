import { AppState } from 'store/rootReducer';

export const isLoading = (state: AppState) => state.posts && state.posts.isLoading;

export const hasError = (state: AppState) => state.posts && state.posts.hasError;

export const data = (state: AppState) => state.posts && state.posts.data;