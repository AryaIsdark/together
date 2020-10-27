import {Post} from 'types/post'

export enum ActionTypes {
    SET_DATA = 'posts/setData',
    SET_LOADING = 'posts/setLoading',
    SET_HAS_ERROR = 'posts/setHasError'
}

export interface PostsState {
    isLoading: boolean,
    hasError : boolean,
    data : Post[]
}

export interface Action {
    type: ActionTypes;
    payload: Partial<PostsState>;
}
  